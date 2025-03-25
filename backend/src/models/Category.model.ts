import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.model";
import mongoose,{HydratedDocument} from 'mongoose'
type Image={
public_id:'',
image_uri:''
}
export type ProfileDocument = HydratedDocument<Category>;


@Schema({versionKey:false,timestamps:true})
export class Category{

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    user:User
    @Prop({type:String,required:true,trim:true})
    name :string 
    @Prop({type:String,required:true,trim:true})
    slug:string
    @Prop({type:String,required:true,trim:true})
    desc:string 
    @Prop({type:{},required:true})
    image:Image

    @Prop({type:Boolean,default:true})
    isPublic:boolean



}
export const CategorySchema = SchemaFactory.createForClass(Category);


