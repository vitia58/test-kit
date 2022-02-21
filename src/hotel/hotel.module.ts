import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from 'src/models/Hotel';
import { Room, RoomSchema } from 'src/models/Room';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}