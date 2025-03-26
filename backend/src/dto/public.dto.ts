import { IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject ,IsMongoId} from "class-validator" 
 
export class getServiceByCategoryORServiceSlugDTO{
    @IsNotEmpty({message:"Category Slug is Required"})
    category:string 
    @IsNotEmpty({message:"Service Slug is Required"})
    service:string 
 
}

export class ServiceIdDTO{
    @IsNotEmpty({message:"service is Required"})
    @IsMongoId({message:"Shohuld be a valid ID"})
    service:string
}

export class EnqueryFormDto{
    @IsNotEmpty({message:"name is Required"})
    name:string 
    @IsNotEmpty({message:"email is Required"})
    @IsEmail()
    email:string 
    @IsNotEmpty({message:"phone no is Required"})
    phone:string 
    @IsNotEmpty({message:"message is Required"})
    message:string 
 
}