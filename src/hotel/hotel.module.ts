import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from 'src/models/Hotel';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}