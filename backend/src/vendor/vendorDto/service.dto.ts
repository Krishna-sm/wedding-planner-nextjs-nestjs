import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Section,Image } from "./constant.vendorDTO";

export class CreateVendorServiceDTO{
    @IsMongoId({message:"Category Should be valid MongoDB ID"})
    @IsNotEmpty({message:'Category is Required'})
    category:string;
    @IsNotEmpty({message:'Enter Valid Service Title'})
    title:string;
    @IsNotEmpty({message:'Enter Valid Service Description'})
    desc:string;
    @IsNotEmpty({message:'Enter Valid budget'})
    // @Min(100,{message:'Budget Should be grater than ₹ 100/-'})
    budget:number;
    @IsNotEmpty({message:'Enter Valid Keywords'})
    keywords:string;
    @IsNotEmpty({message:"Sections is required"})
    @IsArray({message:'section should be a valid array'})
    sections:Section[]
}
export class PaginationDTO{
 
    @IsMongoId({message:"Category Should be valid MongoDB ID"})

    @IsOptional()
    category:string;
 
    @IsOptional() 
    page:number 
}




export class UpdateVendorServiceDTO{
    @IsMongoId({message:"Category Should be valid MongoDB ID"})
    @IsNotEmpty({message:'Category is Required'})
    category:string;
    @IsNotEmpty({message:'Enter Valid Service Title'})
    title:string;
    @IsNotEmpty({message:'Enter Valid Service Description'})
    desc:string;
    @IsNotEmpty({message:'Enter Valid budget'})
    // @Min(100,{message:'Budget Should be grater than ₹ 100/-'})
    budget:number;
    @IsNotEmpty({message:'Enter Valid Keywords'})
    keywords:string;
    @IsNotEmpty({message:"Sections is required"})
    @IsArray({message:'section should be a valid array'})
    sections:Section[]

    // @IsNotEmpty({message:"previews_images is required"})
    // @IsArray({message:'previews_images should be a valid array'})
    // previews_images:Image[]

    // @IsNotEmpty({message:"removed_image is required"}) 
    @IsOptional({message:"Remove Array is Optional"})
    // @IsArray({message:'removed_image should be a valid array',})
    
    removed_image:string[]

    @IsNotEmpty({message:' Enter valid Status'})
    isPublish:boolean;

 

  
}