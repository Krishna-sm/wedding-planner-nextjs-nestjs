import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO ,LoginUserDTO, UpdateProfileDTO} from 'src/dto/auth.dto';
import { User } from 'src/models/User.model';
import { Profile } from 'src/models/Profile.model';
import { JwtService } from '@nestjs/jwt';
import {compare} from 'bcryptjs'
import cloudinary from 'src/utils/Cloudiary';
import { Category } from 'src/models/Category.model';
import { Service } from 'src/models/Service.model';
import { Enquery } from 'src/models/Enquery.model';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private UserModel:Model<User>, @InjectModel(Profile.name) private ProfileModel:Model<Profile>, 
    @InjectModel(Category.name) private readonly CategoryModel:Model<Category>,
            @InjectModel(Service.name) private readonly ServiceModel:Model<Service>,
            @InjectModel(Enquery.name) private readonly EnqueryModel:Model<Enquery>,
    
    private jwtService: JwtService){}
    
    async registerUser(data:RegisterUserDTO){

        const checkUser = await this.UserModel.findOne({email:data.email.toLowerCase()})
        if(checkUser){
            throw new BadRequestException("User Already Exist with this Email")
        }
      const user=  await this.UserModel.create({
            name:data.name,
            email:data.email,
            password:data.password,
            role:data.role
        })

        const token = this.jwtService.sign({userId:user._id,type:data.role},{
            expiresIn:'30d'
        })

        return {
            msg:"User Register Successfully",
            token
        }
    }

    async loginUser(data:LoginUserDTO){
        const check_exist = await this.UserModel.findOne({email:data.email.toLowerCase()})
        if(!check_exist){
            throw new BadRequestException("Account Not Found")
        }

        const isMatch = await compare(data.password,check_exist.password)

        if(!isMatch){
            throw new BadRequestException("Invalid Credentials")
        }

        const token = this.jwtService.sign({userId:check_exist._id,type:check_exist.role},{
            expiresIn:'30d'
        })

        return {
            msg:"User Login Successfully",
            token
        }




    }


    async UserProfile(id:string,role:string){
        const profile ={
            dashboard:{}
        }
        const user = await this.UserModel.findById(id)
            .select("name email role -_id");

        const existProfile =  await this.ProfileModel.findOne({user:id})
        if(!existProfile){
        const profilleData=   await  this.ProfileModel.create({
            user:id
           })
           profile['avatar']=profilleData.avatar.uri
           profile['isEmailVerified']=profilleData.isEmailVerified
           profile['address']=profilleData.address
           profile['bio']=profilleData.bio
           profile['phone_no']=profilleData.phone_no
        }else{
            profile['avatar']=existProfile.avatar.uri
           profile['isEmailVerified']=existProfile.isEmailVerified
           profile['address']=existProfile.address
           profile['bio']=existProfile.bio
           profile['phone_no']=existProfile.phone_no

        }
        
        // dashboard
        // for users
        let data:any ={}
        if(role==='user'){
            data={
                total_enquries:0
            }
            const toalEnqueries = await this.EnqueryModel.countDocuments({
                email:user?.email
            })
           data ={
                'total_enquries':toalEnqueries
            }
            profile['dashboard']=data
        }
        if(role=='vendor'){

             data={
                'total_services':0,
                'total_enquries':0
            }
           const total_services= await this.ServiceModel.countDocuments({user:id})

           data['total_services']=total_services

           const all_enquries = await this.EnqueryModel.find({})
           .populate("service","user")

      
         const total_enquries=  await Promise.all(all_enquries.filter(async(cur,i)=>{
                return cur.service.user === (id as any)
           }))

           data['total_enquries']=total_enquries.length




        }
        if(role=='admin'){

                data={
                    'total_service':0,
                    'total_categories':0,
                    'total_vendors':0,
                    'total_users':0,
                    'total_enquries':0,
                }


                const toalEnqueries = await this.EnqueryModel.countDocuments()

                data['total_enquries'] =toalEnqueries

                const total_service = await this.ServiceModel.countDocuments()

                data['total_service'] =total_service


                
                const total_vendors = await this.UserModel.countDocuments({
                    role:'vendor'
                })

                data['total_vendors'] =total_vendors

                const total_users = await this.UserModel.countDocuments({
                 
                })

                data['total_users'] =total_users

                const total_categories = await this.CategoryModel.countDocuments({
                 
                })

                data['total_categories'] =total_categories


                
        }


 
        return {...user?.toObject(),...profile,dashboard:data}
    }


    async UpdateAvatar(file: Express.Multer.File,id:string){
        console.log("user id  ",id)

        const profileImage = await cloudinary.uploader.upload(file.path,{
            folder:'wedding-planner'
        })

        const userProfile = await this.ProfileModel.findOne({user:id})
        if(userProfile?.avatar?.public_id){
            await cloudinary.uploader.destroy(userProfile?.avatar?.public_id)
        }

const profiled =await this.ProfileModel.findOneAndUpdate({user:id},{
    avatar:{
        uri:profileImage.secure_url ,
        public_id:profileImage.public_id
    }
})
console.log("user profiled  ",profiled)

        return {
            msg:"Image Update Successfully !",
            profiled
        } 

    }
    async UpdateProfile(data:UpdateProfileDTO,id:string){
        // console.log(data)

      await this.ProfileModel.findOneAndUpdate({user:id},{
        bio:data.bio,
        address:data.address,
        gender:data.gender,
        phone_no:data.phone_no
      })
      await this.UserModel.findByIdAndUpdate(id,{
        name:data.name,
         
      })

        return {
            msg:"Profile Updated Succesfully !"
        }
    }

}
