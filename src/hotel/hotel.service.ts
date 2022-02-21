import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from 'src/models/Hotel';
import { CHotelListResponseDTO } from './dto/CHotelListResponseDTO';

@Injectable()
export class HotelService {
  constructor(
      @InjectModel(Hotel.name)
      private readonly hotelModel: Model<HotelDocument>,
    ) {}
  async list():Promise<CHotelListResponseDTO> {
    const list = await this.hotelModel.find().exec()
    return list.map(h=>h.toObject()).map(({_id,title,description,photo})=>({id:_id+"",title,description,photo}))
  }
  
}
