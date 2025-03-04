import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO,LoginUserDTO } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';

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

}
