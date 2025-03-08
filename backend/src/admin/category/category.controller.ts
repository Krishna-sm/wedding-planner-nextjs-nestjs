import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors,Get,Param ,Delete, Put} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoryIdDTO, CreateCategoryDTO ,UpdateCategoryDTO} from '../dto/Category.dto';
import { CategoryService } from './category.service';

@Controller('/api/v1/admin/category')
@UseGuards(AuthGuard)
export class CategoryController {

    constructor(private readonly categoryService:CategoryService){}

    @Post("/create")
    @UseInterceptors(FileInterceptor('image'))
    async createCategory(@UploadedFile() file: Express.Multer.File,@Req() req,@Body() data:CreateCategoryDTO){
        const res_obj = await this.categoryService.createCategoryService(file,req.user,data);

        return res_obj;
    }

    @Get("/get-all") 
    async getAllCategories(){
        const res_obj = await this.categoryService.getAllCategoriesService();

        return res_obj;
    }

    @Delete("/delete/:id") 
    async deleteCategoryById(@Param() data:CategoryIdDTO){
        const res_obj = await this.categoryService.deleteCategoryById(data.id);

        return res_obj;
    }

    @Get("/get/:id") 
    async getCategoryById(@Param() data:CategoryIdDTO){
        const res_obj = await this.categoryService.getCategoryByIdService(data.id);

        return res_obj;
    }


    @Put("/edit/:id") 
    @UseInterceptors(FileInterceptor('image'))
    async editCategoryById(@Param() data:CategoryIdDTO,@Body() body:UpdateCategoryDTO,@UploadedFile() file: Express.Multer.File){
        const res_obj = await this.categoryService.editCategoryById(data.id,body,file);

        return res_obj;
    }


}
