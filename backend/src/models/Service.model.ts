import { Prop, Schema ,SchemaFactory} from "@nestjs/mongoose";
import { Category } from "./Category.model";
import { User } from "./User.model";
import mongoose,{HydratedDocument} from "mongoose";
import { Section } from "src/vendor/vendorDto/constant.vendorDTO";


export type ProfileDocument = HydratedDocument<Service>;

interface Image{
    uri:string 
    public_id:string
}
@Schema({timestamps:true,versionKey:false})
export class Service{
    [x: string]: any;
   
    
    @Prop({required:true,ref:'User',type:mongoose.Schema.Types.ObjectId})
    user:User;

    @Prop({required:true,ref:'Category',type:mongoose.Schema.Types.ObjectId})
    category:Category;

    @Prop({type:String,required:true,trim:true})
    title:string;
    @Prop({type:String,required:true,trim:true})
    slug:string;
    @Prop({type:String,required:true,trim:true})
    desc:string;
    @Prop({type:Number,required:true})
    budget:number;
    @Prop({type:String,required:true,trim:true})
    keywords:string;
     @Prop({default:[],type:[{uri:String,public_id:String}]})
    images:Image[]

    
    @Prop({type:[{title:String,content:String}],required:true})
    sections:Section[]
    @Prop({type:Boolean,default:true})
    isPublish:boolean
    @Prop({type:Boolean,default:false})
    isAdminBlock:boolean
    @Prop({type:String,default:''})
    remark:string
 



}



 
export const ServiceSchema = SchemaFactory.createForClass(Service);
