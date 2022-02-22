import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CUserDTO } from 'src/auth/dto/CUserDTO';
import { Room, RoomDocument } from 'src/models/Room';
import { User, UserDocument } from 'src/models/User';
import { COrderDTO } from './dto/COrderDTO';

@Injectable()
export class RoomService {
  constructor(
      @InjectModel(Room.name)
      private readonly roomModel: Model<RoomDocument>,
      @InjectModel(User.name)
      private readonly userModel: Model<UserDocument>,
    ) {}
  async list(id: string, user: CUserDTO){
    const list = await this.roomModel.find({hotel:id},{},{sort:{number:1}}).exec()
    return list
      .map(e=>e.toObject())
      .map(({owner,number,price,_id})=>({
        id:_id,
        available:this.checkAvailable(owner,user),
        number,
        price
      }))
  }
  async info(id: string, user: CUserDTO){
    console.log(id)
    const roomDoc = await this.roomModel.findById(id).exec()
    const {owner,price,number,photo,roomsAmount,bedsAmount} = roomDoc.toObject()
    return {
      available:this.checkAvailable(owner,user),
      price,
      number,
      photo,
      roomsAmount,
      bedsAmount
    }
  }
  async order(order: COrderDTO, user: CUserDTO){
    const room = await this.roomModel.findById(order.id).exec()
    let result:"Куплено"|"Недостаточно денег"|"Вы уже купили этот номер"|"Номер уже занят другим человеком"|"Номер не найден" = "Номер не найден"
    let money = 0
    if(!room)return {result,money,id:""}
    if(room.owner==null){
      if(user.money>=room.price){
        const {money:m} = await this.userModel.findByIdAndUpdate({_id:user._id},{money:user.money-room.price},{new:true}).exec()
        await room.updateOne({owner:user.id}).exec()
        money = m
        result = "Куплено"
      }else result = "Недостаточно денег"
    }else if(room.owner==user.id)result = "Вы уже купили этот номер"
    else result = "Номер уже занят другим человеком"
    return {result,money,id:room.hotel}
  }
  checkAvailable(owner:string,user:CUserDTO):"Free"|"Your"|"Other"{
    if(owner==null)return "Free"
    else if(owner==user.id)return "Your"
    else return "Other"
  }
}
