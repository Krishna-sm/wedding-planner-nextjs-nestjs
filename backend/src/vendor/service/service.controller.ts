import { Body, Controller,Post,Req,UploadedFiles,UseGuards, UseInterceptors ,Get,Param,Delete,Put,Query} from '@nestjs/common';
import {VendorGuard} from 'src/guards/vendor/vendor.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ServiceService } from './service.service';
import { CreateVendorServiceDTO,PaginationDTO,UpdateVendorServiceDTO } from '../vendorDto/service.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('/api/v1/vendor/service')
@UseGuards(AuthGuard,VendorGuard)
export class ServiceController {
    constructor(private readonly vendorSevice:ServiceService){}

    @Post("/create")
    @UseInterceptors(FilesInterceptor('images'))
    async createNewService(@Body() data:CreateVendorServiceDTO,@UploadedFiles() files: Express.Multer.File[],@Req() req){
        const res_obj = await this.vendorSevice.createNewService(data,files,req.user);
        return res_obj
    }


 @Get("/get-all")
    async getAllServices(@Query() query:PaginationDTO,){
        const res_obj = await this.vendorSevice.getAllServices(query.page,query.category);
        return res_obj
    }
    @Get("/category")
    async getAllCategories(){
        const res_obj = await this.vendorSevice.getAllCategoriesService();
        return res_obj
    }

    @Delete("/delete/:id")
    async deleteServiceById(@Param('id') id:string){
        const res_obj = await this.vendorSevice.deleteServiceById(id);
        return res_obj
    }

    @Get("/get/:id")
    async getServicebyId(@Param('id') id:string){
        const res_obj = await this.vendorSevice.getServicebyId(id);
        return res_obj
    }


    @Put("/update/:id")
    @UseInterceptors(FilesInterceptor('images'))
    async updateServiceById(@Body() data:UpdateVendorServiceDTO,@UploadedFiles() files: Express.Multer.File[],@Req() req,@Param('id') id:string){
        const res_obj = await this.vendorSevice.updateServiceById(data,files,req.user,id);
        return res_obj
    }


  
}
