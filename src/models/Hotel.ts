import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { pathToUrl } from 'src/others/constants';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({transform:pathToUrl})
  photo: string;

  @Prop()
  address: string;

  @Prop({transform:()=>undefined})
  createdAt: Date;
  
  @Prop({transform:()=>undefined})
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
/*
[
  {
    "title": "VitiaCraft",
    "description": "vitia's hostel",
    "photo": "image1.jpg",
    "address": "vitia street"
  },
  {
    "title": "SlavaC7",
    "description": "slava's hostel",
    "photo": "image2.jpg",
    "address": "slava street"
  },  
]
*/