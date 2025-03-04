import { Body, Controller, Post,Get,UseGuards, Req } from '@nestjs/common';
import { RegisterUserDTO,LoginUserDTO } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import {VendorGuard} from 'src/guards/vendor/vendor.guard';

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
         @UseGuards(AuthGuard,VendorGuard) 
         async UserProfile(@Req() req){
       
                const res_obj = await this.authService.UserProfile(req.user,req.type)
                return res_obj
         }   

}
