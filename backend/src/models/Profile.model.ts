import { Prop, Schema ,SchemaFactory} from "@nestjs/mongoose";
import { User } from "./User.model";
import mongoose,{HydratedDocument} from 'mongoose'
export type ProfileDocument = HydratedDocument<Profile>;

export type Address = {
    street?:string
    pincode?:string
    landmark?:string
}

interface Avatar{
    uri:string 
    public_id:string
}

@Schema({ timestamps:true, versionKey:false}) 
export class Profile{
    @Prop({required:true,ref:'User',type:mongoose.Schema.Types.ObjectId})
    user:User

    @Prop({default:{uri:"",public_id:''},type:{}})
    avatar:Avatar
    @Prop({default:false,type:Boolean})
    isEmailVerified:boolean
    @Prop({default:{},type:{}})
    address:Address
    @Prop({default:'',type:String})
    bio:string
    @Prop({default:'male',type:String,enum:['male','female']})
    gender:string
}
export const ProfileSchema = SchemaFactory.createForClass(Profile);
