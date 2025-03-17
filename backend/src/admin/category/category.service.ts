import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/models/Category.model';
import { CreateCategoryDTO,UpdateCategoryDTO } from '../dto/Category.dto';
import cloudinary from 'src/utils/Cloudiary';
import {Generate} from 'src/utils/SlugData'
@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly CategoryModel:Model<Category>){}
    async createCategoryService(file: Express.Multer.File,user:string,data:CreateCategoryDTO){

        // await this.CategoryModel.create({

        // })

        const uploadResult = await cloudinary.uploader.upload(file.path,{
            folder:'wedding-planner-admin-cateogry'
        })

        if(!uploadResult.secure_url){
            // bad request
            throw new BadRequestException("Can not Proccess Image")
            return
        }
        await this.CategoryModel.create({
            image:{
                public_id:uploadResult.public_id,
                image_uri:uploadResult.secure_url
            },
            user,
            name:data.name,
            desc:data.desc,
            slug:Generate(data.name)


        })



        return {
          msg:"Category Added !"
        }
    }
    async getAllCategoriesService(){

        const all_categories = await this.CategoryModel.find({})
        .select("name image.image_uri isPublic slug")

        return all_categories
    }

    async deleteCategoryById(id:string){
        const category = await this.CategoryModel.findByIdAndDelete(id)
    if(!category){
        //bad request
        throw new NotFoundException("Category Not Found")
        return 
    }

    if(category.image.public_id){
   await cloudinary.uploader.destroy(category.image.public_id)

    }
 

        return {
            msg:"Category Deleted!"
        }
    }

    async getCategoryByIdService(id:string){
        const category =  await this.CategoryModel.findById(id)
        

        if(!category){
            //bad request
            throw new NotFoundException("Category Not Found")
            return 
        }
        return category



    }

    async editCategoryById(id:string,data:UpdateCategoryDTO,file:Express.Multer.File){

        const category = await this.CategoryModel.findById(id);
        const updateObj = {}
        if(!category){
            throw new NotFoundException("Category Not Found")
        }

        // if image aayega tab
        if(file){
           await cloudinary.uploader.destroy(category.image.public_id)

        const uploadResult = await cloudinary.uploader.upload(file.path)
        updateObj['image'] = {
            image_uri:uploadResult.secure_url,
            public_id:uploadResult.public_id
        }

        }

        if(data.name !==category.name){
            updateObj['slug']=Generate(data.name)
        }
        await this.CategoryModel.findByIdAndUpdate(id,{
            ...updateObj,
            name:data.name,
            desc:data.desc,
            isPublic:data.status
        })

        return {
            msg:"Category Updated !"
        }





    }
}
