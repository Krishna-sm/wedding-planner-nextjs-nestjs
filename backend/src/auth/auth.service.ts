import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO ,LoginUserDTO, UpdateProfileDTO} from 'src/dto/auth.dto';
import { User } from 'src/models/User.model';
import { Profile } from 'src/models/Profile.model';
import { JwtService } from '@nestjs/jwt';
import {compare} from 'bcryptjs'
import cloudinary from 'src/utils/Cloudiary';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private UserModel:Model<User>, @InjectModel(Profile.name) private ProfileModel:Model<Profile>,    private jwtService: JwtService){}
    
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
        const profile ={}
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
        }else{
            profile['avatar']=existProfile.avatar.uri
           profile['isEmailVerified']=existProfile.isEmailVerified
           profile['address']=existProfile.address
           profile['bio']=existProfile.bio
        }
        

 
        return {...user?.toObject(),...profile}
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
        gender:data.gender
      })
      await this.UserModel.findByIdAndUpdate(id,{
        name:data.name,
         
      })

        return {
            msg:"Profile Updated Succesfully !"
        }
    }

}
