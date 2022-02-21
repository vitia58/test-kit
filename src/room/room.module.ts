import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/models/Room';
import { User, UserSchema } from 'src/models/User';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}