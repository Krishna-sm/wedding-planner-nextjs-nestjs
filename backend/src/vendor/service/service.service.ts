import { Injectable ,NotFoundException,BadRequestException} from '@nestjs/common';
import { CreateVendorServiceDTO ,UpdateVendorServiceDTO} from '../vendorDto/service.dto';
import cloudinary from 'src/utils/Cloudiary'
import {Generate} from 'src/utils/SlugData'
import {Category} from 'src/models/Category.model'
import {Service} from 'src/models/Service.model'
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
interface Image{
    uri:string 
    public_id:string
}
@Injectable()
export class ServiceService {

       constructor(@InjectModel(Category.name) private readonly CategoryModel:Model<Category>,@InjectModel(Service.name) private readonly ServiceModel:Model<Service>){}
   

    
    async createNewService(data:CreateVendorServiceDTO,files:Express.Multer.File[],user:string){
 
             //category validation
           const find_category = await this.CategoryModel.findById(data.category)
           if(!find_category){
            throw new NotFoundException("Category Not Found")
           }
           
            // images
            if(files.length<1){
                throw new NotFoundException('plese Upload Some Image')
            }
            const images:Image[] = []

         await  Promise.all( files.map(async(cur,i)=>{
          const image =  await cloudinary.uploader.upload(cur.path,{
            folder:'wedding-planner-vendors-service'
          })

          images.push({
            uri:image.secure_url,
            public_id:image.public_id
          })

           }))

           //slug generation
           const slug = Generate(data.title)

          

        const doc =    await this.ServiceModel.create({
            images,
            slug,
            user,
            ...data

           })

       
       
        return {
            "msg":"Service Added :)"
        }
    }

    async getAllCategoriesService(){

        const categories = await this.CategoryModel.find({isPublic:true})
        .select("name")
        return categories


    }

    async getAllServices(page=1,category=''){
        const page_limit =3
        const queryParams = {
       
        }

       if(category) {
        queryParams['category']=category
       }

        const all_services =await this.ServiceModel.find(queryParams)
        .select("title category  budget images isPublish isAdminBlock remark")
        .populate("category","name -_id")
        .skip(page_limit*(page-1))
        .limit(page_limit)
        if(all_services.length<=0){
        return {
            data:[],
            has:false
        }

        }

        const new_arr:any[] =[]
       await Promise.all(all_services.map((cur)=>{
        
            const image = cur.images[0]?.uri 
            new_arr.push({
                ...cur.toObject(),
                images:image
            })
        }) )

        
        const all_documents = await this.ServiceModel.countDocuments()

        const has_documents =  all_documents > page_limit*(page) 


 
        console.log(new_arr,has_documents)
        return {data:new_arr,has:has_documents}

    }

    async deleteServiceById(id:string){

        const service = await this.ServiceModel.findById(id)

            if(!service){
                throw new NotFoundException("Service Not Found")
            }

            // delete all images on clodinary

            await Promise.all(service.images.map(async(cur)=>{
             await   cloudinary.uploader.destroy(cur.public_id)    
            }))

            await this.ServiceModel.findByIdAndDelete(id)

            return {
                msg:"Service Deleted !"
            }



    }


    async getServicebyId(id:string){

        const service = await this.ServiceModel.findById(id)
        .select("-isAdminBlock  -remark -slug -user")

            if(!service){
                throw new NotFoundException("Service Not Found")
            }
 

            return service



    }


    async updateServiceById(data:UpdateVendorServiceDTO,files: Express.Multer.File[],user:string,id:string){
        const update_obj={}


  const service = await this.ServiceModel.findById(id) 

            if(!service){
                throw new NotFoundException("Service Not Found")
            }
 


         let new_images=     service.images.filter((img) => !data.removed_image.includes(img.public_id)).length 

         if(files?.length>0){
            new_images+=files?.length
         }

 
                    console.log(new_images)
            
         if(new_images<1){
            throw new BadRequestException("Aleast Upload 2 Images For Service.")
        }
// delete remove array images
if(data?.removed_image && data?.removed_image?.length>0){
    await Promise.all(data.removed_image.map(async(cur)=>{
        await   cloudinary.uploader.destroy(cur)    
       }))
}

//images
const images:Image[] = []
if(files && files?.length>0){
 

    await  Promise.all( files.map(async(cur,i)=>{
     const image =  await cloudinary.uploader.upload(cur.path,{
       folder:'wedding-planner-vendors-service'
     })

     images.push({
       uri:image.secure_url,
       public_id:image.public_id
     })

      }))
}

//slug
if(service.title !== data.title){
    update_obj['slug'] =Generate(data.title)
}
const set_images  = [...service.images.filter((img) => !data.removed_image.includes(img.public_id)), ...images]
console.log(set_images)
const result=await this.ServiceModel.findByIdAndUpdate(id,{
    ...data,
    ...update_obj,
    images: set_images
 

    
})


console.log(result)

return result


    }
}


  /**
     * {
    "category": "67cc04dceda41bcee986bc9d",
    "title": "dsad",
    "removed_image": [
        "wedding-planner-vendors-service/gxelopwbuqzcdkocqxrb",
        "wedding-planner-vendors-service/fahmhirkcab8qquzipjq"
    ],
    "desc": "dsadad",
    "isPublish": "true",
    "sections": [
        {
            "title": "Key Responsiblities",
            "content": "dasdad"
        }
    ],
    "keywords": "dasdda,dasd,dasd,das",
    "budget": "5000"
}
     */
