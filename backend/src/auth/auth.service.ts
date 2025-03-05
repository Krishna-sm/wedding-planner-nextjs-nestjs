import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO ,LoginUserDTO} from 'src/dto/auth.dto';
import { User } from 'src/models/User.model';
import { JwtService } from '@nestjs/jwt';
import {compare} from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private UserModel:Model<User>,    private jwtService: JwtService){}
    
    async registerUser(data:RegisterUserDTO){

        const checkUser = await this.UserModel.findOne({email:data.email.toLowerCase()})
        if(checkUser){
            throw new BadRequestException("User Already Exist with this Email")
        }
      const user=  await this.UserModel.create({
            name:data.name,
            email:data.email,
            password:data.password,
            role:data.role
        })

        const token = this.jwtService.sign({userId:user._id,type:data.role},{
            expiresIn:'30d'
        })

        return {
            msg:"User Register Successfully",
            token
        }
    }

    async loginUser(data:LoginUserDTO){
        const check_exist = await this.UserModel.findOne({email:data.email.toLowerCase()})
        if(!check_exist){
            throw new BadRequestException("Account Not Found")
        }

        const isMatch = await compare(data.password,check_exist.password)

        if(!isMatch){
            throw new BadRequestException("Invalid Credentials")
        }

        const token = this.jwtService.sign({userId:check_exist._id,type:check_exist.role},{
            expiresIn:'30d'
        })

        return {
            msg:"User Login Successfully",
            token
        }




    }


    async UserProfile(id:string,role:string){
        const user = await this.UserModel.findById(id)
            .select("name email role -_id")
        ;
        console.log(user)
        return user
    }

}
