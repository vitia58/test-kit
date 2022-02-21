import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Hotel } from './Hotel';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  _id: Types.ObjectId;

  @Prop({type:Types.ObjectId,ref:Hotel.name})
  hotel: string;

  @Prop({transform:()=>undefined})
  createdAt: Date;
  @Prop({transform:()=>undefined})
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);