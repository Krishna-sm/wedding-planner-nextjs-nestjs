import { IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject } from "class-validator"
import { Address } from "src/models/Profile.model"
export enum UserRole {
    User="user",
    Admin="admin",
    Vendor="vendor"
  }
export class RegisterUserDTO{
    @IsNotEmpty({message:"Name is Required"})
    name:string 
    @IsNotEmpty({message:"Email is Required"})
    @IsEmail()
    email:string 
    @IsNotEmpty({message:"Password is Required"})
    password:string 
    @IsNotEmpty({message:"Role is Required"})
    @IsEnum(UserRole) 
    role: UserRole
}

export class LoginUserDTO{

  @IsNotEmpty({message:"Email is Required"})
  @IsEmail()
  email:string 
  @IsNotEmpty({message:"Password is Required"})
  password:string 
}

export enum GenderEnum {
  Male="male",
  Female="female"
}
export class UpdateProfileDTO{

   @IsNotEmpty({message:"Name is Required"})
   name:string 

   @IsNotEmptyObject({nullable:true})
   address:Address

   @IsNotEmpty({message:"bio is Required"})
   bio:string

   @IsNotEmpty({message:"Gender is Required"}) 
   @IsEnum(GenderEnum) 
   gender:string

   @IsNotEmpty({message:"Phone No is Required"})  
   phone_no:string

}