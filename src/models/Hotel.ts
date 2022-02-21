import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  photo: string;

  @Prop({transform:()=>undefined})
  createdAt: Date;
  
  @Prop({transform:()=>undefined})
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);