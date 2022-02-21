import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from 'src/models/Hotel';
import { Room, RoomDocument } from 'src/models/Room';
import { CHotelListResponseDTO } from './dto/CHotelListResponseDTO';

@Injectable()
export class HotelService {
  constructor(
      @InjectModel(Hotel.name)
      private readonly hotelModel: Model<HotelDocument>,
      @InjectModel(Room.name)
      private readonly roomModel: Model<RoomDocument>,
    ) {}
  async list():Promise<CHotelListResponseDTO> {
    const list = await this.hotelModel.find().exec()
    return list.map(h=>h.toObject()).map(({_id,title,description,photo})=>({id:_id+"",title,description,photo}))
  }
  async get(id: string){
    const hotelDoc = await this.hotelModel.findById(id).exec()
    const {title,description,photo,address} = hotelDoc.toObject()
    const rooms = await this.roomModel.count({hotel:id}).exec()
    return {title,description,photo,address,rooms}
  }
}
