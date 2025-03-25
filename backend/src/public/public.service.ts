import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/models/Category.model';
import { Service } from 'src/models/Service.model';
import {Model} from 'mongoose'
@Injectable()
export class PublicService {
    constructor(@InjectModel(Category.name) private readonly CategoryModel:Model<Category>,
    @InjectModel(Service.name) private readonly ServiceModel:Model<Service>
){}


    async popularServices(){

            const services = await this.ServiceModel.find({isPublish:true})
            .limit(4)
            .select("slug title images desc budget  -_id")
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
       
        .select("slug title images desc budget  -_id")
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
   
    .select("slug title images desc budget  -_id")
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

}

