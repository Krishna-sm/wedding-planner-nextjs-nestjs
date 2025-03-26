import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/models/Category.model';
import { Service } from 'src/models/Service.model';
import {Model} from 'mongoose'
import { getServiceByCategoryORServiceSlugDTO ,EnqueryFormDto,ServiceIdDTO} from 'src/dto/public.dto';
import { User } from 'src/models/User.model';
import { Profile } from 'src/models/Profile.model';
import { Enquery } from 'src/models/Enquery.model';


@Injectable()
export class PublicService {
    constructor(@InjectModel(Category.name) private readonly CategoryModel:Model<Category>,
    @InjectModel(Service.name) private readonly ServiceModel:Model<Service>,
    @InjectModel(User.name) private readonly UserModel:Model<User>,
    @InjectModel(Profile.name) private readonly ProfileModel:Model<Profile>,
    @InjectModel(Enquery.name) private readonly EnqueryModel:Model<Enquery>,
    
){}


    async popularServices(){

            const services = await this.ServiceModel.find({isPublish:true})
            .limit(4)
            .select("slug title images desc budget  category -_id")
            .populate("category","slug -_id")
            ;
            const new_arr:any[]=[]
            await Promise.all(services.map((cur)=>{
        
                const image = cur.images[0]?.uri 
                new_arr.push({
                    ...cur.toObject(),
                    images:image
                })
            }) )
     

            return new_arr


    }
    async showAllServices(){

        const services = await this.ServiceModel.find({isPublish:true})
       
        .select("slug title images desc budget  category -_id")
            .populate("category","slug -_id")

        ;
        const new_arr:any[]=[]
        await Promise.all(services.map((cur)=>{
    
            const image = cur.images[0]?.uri 
            new_arr.push({
                ...cur.toObject(),
                images:image
            })
        }) )
 

        return new_arr


}
    


    async popularCategories(){

        const categories = await this.CategoryModel.find({isPublic:true})
        .limit(4)
        .select("slug name image.image_uri desc -_id")
        
        ;
        return categories


}

 async showAllCategories(){
    const categories = await this.CategoryModel.find({isPublic:true})
  
    .select("slug name image.image_uri desc -_id")
    
    ;
    return categories
 }

 
 async showAllServicesbySlug(slug:string){

    const category = await this.CategoryModel.findOne({
        slug:{
            $regex:slug,$options: 'i'
        }
    })
    if(!category){
        return [];
    }

    const services = await this.ServiceModel.find({isPublish:true,
        
        category:category
    
    })
    
    .select("slug title images desc budget  category -_id")
    .populate("category","slug -_id")
    ;
    const new_arr:any[]=[]
    await Promise.all(services.map((cur)=>{

        const image = cur.images[0]?.uri 
        new_arr.push({
            ...cur.toObject(),
            images:image
        })
    }) )


    return new_arr


}

async getServiceByCategoryORServiceSlug(data:getServiceByCategoryORServiceSlugDTO){

        const category = await this.CategoryModel.findOne({
            slug:{  $regex:data.category,$options: 'i'},
            isPublic:true
        })

        if(!category){
            throw new NotFoundException("Category Not Found")
        }

        let service =  await this.ServiceModel.findOne({
            slug:{  $regex:data.service,$options: 'i'},
            category:category._id
        })
        .select("slug title user desc budget keywords images sections isPublish ")
        .populate("user","name email")

        //more service for same category PENDING Task

          
         

        
        
        if(!service){
            throw new NotFoundException("Service Not Found")
        }
        const user = {
            name:service.user.name,
            email:service.user.email,
        }
        const userDetails = await this.ProfileModel.findOne({
            user:  service.user?._id
        })
        if(userDetails){

            user['avatar'] =userDetails.avatar.uri
            user['isEmailVerified'] =userDetails.isEmailVerified
            user['address'] =userDetails.address
            user['bio'] =userDetails.bio
            user['gender'] =userDetails.gender
            user['phone_no'] = userDetails.phone_no
        }
        const images:any=[]
        await Promise.all(service.images.map(async(cur,i)=>{
            images[i]  = cur.uri
        }))
       service['images'] =[] 

        return  {
            ...service.toObject(),
            images,
            user
        }
}

async addEnqueryDetails(data:EnqueryFormDto,service:string){
    // /data saved
    await this.EnqueryModel.create({
        ...data,
        service
    })
    return {
        msg:"Details Send Successfully :)"
    }
}
}

