
import {PaginationDTO,UpdateStatusDTO} from './vendorDto/service.dto'
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/models/Category.model';
import { Service } from 'src/models/Service.model';
import {Model} from 'mongoose'
import { User } from 'src/models/User.model'; 
import { Profile } from 'src/models/Profile.model'; 
import { Enquery } from 'src/models/Enquery.model';

@Injectable()
export class VendorService {
     constructor(@InjectModel(Category.name) private readonly CategoryModel:Model<Category>,
        @InjectModel(Service.name) private readonly ServiceModel:Model<Service>,
        @InjectModel(User.name) private readonly UserModel:Model<User>, 
        @InjectModel(Profile.name) private readonly ProfileModel:Model<Profile>, 
        @InjectModel(Enquery.name) private readonly EnqueryModel:Model<Enquery>,
        
    ){}
    async getAllEnquries(data:PaginationDTO,user:string){
        
        const query ={}

        //  for status
        if(data.status){
            query['status'] =data.status.toUpperCase()
        }
        if(data.search){
            query['name'] = {$regex:data.search,$options:'i'}
        }

    // Date range filtering with validation
    if (data.from || data.to) {
        query['createdAt'] = {};
    
        if (data.from && !isNaN(data.from)) {
            query['createdAt'].$gte = new Date(Number(data.from));
        }
    
        if (data.to && !isNaN(data.to)) {
            query['createdAt'].$lte = new Date(Number(data.to));
        }
    }

        
        const all_enquries = await this.EnqueryModel.find(query)
        .select("service name email")
        .populate("service","user title budget")
        if(all_enquries.length<=0){
            return {
                data:[],
                hasMore:false
            }
        }

        // check user is in this data
      const datas=   await Promise.all( all_enquries.filter(async(cur,i)=>{
                    return cur?.service.user?._id == user
        }))
        
        return {
            data:datas,
            hasMore:true
        }
        


    }
    async getEnqueryById(id:string,user:string){
        console.log(id)
        const enquery = await this.EnqueryModel.findById(id)
        .populate("service","_id")

        if(!enquery){
            throw new NotFoundException("Enquery Not Found")
        }
        const service = await this.ServiceModel.findById(enquery.service._id)
        .populate("category","name")
        ;
        
        if(!service){
            throw new NotFoundException("Service Not Found")
        }
        

        const send_data={}
        send_data['id'] = enquery._id
        send_data['name'] = enquery.name
        send_data['budget'] = service.budget
        send_data['email'] = enquery.email
        send_data['phone'] = enquery.phone
        send_data['message'] = enquery.message
        send_data['status'] = enquery.status
        send_data['status'] = enquery.status
        send_data['remark'] = enquery.remark
        send_data['service'] = service.title
        send_data['category'] = service.category.name
        send_data['date'] = enquery.createdAt
        // user associate with any account 
        const new_user = await this.UserModel.findOne({email:enquery.email.toLowerCase()})
        if(new_user){
          
            const userProfile = await this.ProfileModel.findOne({user:new_user._id})
                if(userProfile){
                    send_data['user_name'] = new_user.name
                send_data['user_email'] = new_user.email
                send_data['user_emailVerified'] = new_user.isEmailVerified
                send_data['user_avatar'] = userProfile.avatar.uri
                send_data['user_address'] = userProfile.address
                }
                
        }



        return send_data


        
       



    }
    
    async updateEnqueryStatus(service:string,user,body:UpdateStatusDTO){
        await this.EnqueryModel.findByIdAndUpdate(service,body)
        return{
            msg:"Status Update SuccessFully :)"
        }
    }
}
