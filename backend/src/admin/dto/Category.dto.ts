import { IsMongoId, IsNotEmpty } from "class-validator"

export class CreateCategoryDTO{
    @IsNotEmpty({message:"Name is Required"})
    name:string 
    @IsNotEmpty({message:"Description is Required"})
    desc:string
}
export class CategoryIdDTO{
    @IsMongoId({message:"Id Must be a Mongodb ID"})
    @IsNotEmpty({message:"ID is required"})
    id:string
}

export class UpdateCategoryDTO{
    @IsNotEmpty({message:"Name is Required"})
    name:string 
    @IsNotEmpty({message:"Description is Required"})
    desc:string
    @IsNotEmpty({message:"Status is Required"})
    status:boolean
}