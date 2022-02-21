import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from 'src/models/User';
import { CUserDTO } from '../dto/CUserDTO';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "Q2d6Vf93Kd985f",
    });
  }
  async validate(
    payload:{id: any}
  ):Promise<CUserDTO>{
    const user = await this.userModel.findById(payload.id)
    const {__v,password,...res} = user.toObject()
    console.log(res)
    return {...res,id:res._id+""}
  }
}