import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose"; 
import mongoose,{HydratedDocument} from 'mongoose'
import {Service} from './Service.model'
export type EnqueryDocument=  HydratedDocument<Enquery>;
@Schema({versionKey:false,timestamps:true})
export class Enquery{
    [x: string]: unknown;
    @Prop({type:String,required:true,trim:true})
    name:string
    @Prop({type:String,required:true,trim:true})
    email:string
    @Prop({type:String,required:true,trim:true})
    phone:string
    @Prop({type:String,required:true,trim:true})
    message:string
        @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Service'})
    service:Service
    @Prop({type:String,default:'PENDING',trim:true})
    status:string
    @Prop({type:String,default:'',trim:true})
    remark:string
    @Prop({type:String,default:'',trim:true})
    isAdminRemark:string
    @Prop({type:Boolean,default:false})
    isBlocked:boolean

}
export const EnquerySchema = SchemaFactory.createForClass(Enquery);
