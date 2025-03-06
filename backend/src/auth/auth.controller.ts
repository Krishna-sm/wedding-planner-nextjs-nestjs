import { Body, Controller, Post,Get,UseGuards, Req, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RegisterUserDTO,LoginUserDTO } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import {VendorGuard} from 'src/guards/vendor/vendor.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

         @Post('/register')
         async registerUser(@Body() data:RegisterUserDTO){
       
                const res_obj = await this.authService.registerUser(data)
                return res_obj
         }   
         @Post('/login')
         async loginUser(@Body() data:LoginUserDTO){
       
                const res_obj = await this.authService.loginUser(data)
                return res_obj
         }   

         @Get('/profile')
         @UseGuards(AuthGuard)     
         async UserProfile(@Req() req){
       
                const res_obj = await this.authService.UserProfile(req.user,req.type)
                return res_obj
         }   


         @Put("/update-avatar")
         @UseGuards(AuthGuard)    
         @UseInterceptors(FileInterceptor('image'))
         async UpdateAvatar(@UploadedFile() file: Express.Multer.File){
            
              const res_obj = await this.authService.UpdateAvatar(file)
              return res_obj
         } 


}
