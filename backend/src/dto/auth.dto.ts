import { IsEmail, IsEnum, IsNotEmpty } from "class-validator"
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