import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({})
export class User {
  _id: Types.ObjectId;

  @Prop({required:true})
  login: string;

  @Prop({default:""})
  userName:string;

  @Prop({required:true,transform:()=>undefined})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);