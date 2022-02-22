import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Hotel } from './Hotel';
import { pathToUrl } from 'src/others/constants';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  _id: Types.ObjectId;

  @Prop({type:Types.ObjectId,ref:Hotel.name})
  hotel: string;

  @Prop()
  owner:string|null

  @Prop()
  price:number

  @Prop()
  number:string

  @Prop({transform:pathToUrl})
  photo:string

  @Prop()
  roomsAmount:number

  @Prop({default:2})
  bedsAmount:number

  @Prop({transform:()=>undefined})
  createdAt: Date;
  @Prop({transform:()=>undefined})
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);