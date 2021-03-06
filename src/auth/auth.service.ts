import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/User';
import { comparePassword, hashPassword } from 'src/others/password-hasher.helper';
import { CLoginDTO } from './dto/CLoginDTO';
import { CRegisterDTO } from './dto/CRegisterDTO';

@Injectable()
export class AuthService {
    constructor(
      @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
      private readonly jwtService:JwtService,
    ) {
  }

  async login(cLoginDTO:CLoginDTO){
    const {login,password} = cLoginDTO
    const user = await this.userModel.findOne({login})
    if(user&&await comparePassword(password,user.password)){
      return {
        access_token:this.jwtService.sign({id:user._id}),
        money:user.money
      }
    }else return {access_token:null,money:0}
  }

  async register(registerDTO:CRegisterDTO){
    const {login,password} = registerDTO
    const hasUser = await this.userModel.exists({login})
    if (hasUser)throw new UnauthorizedException("User already exist")
    const user = await new this.userModel({...registerDTO,password:await hashPassword(password)}).save()
    const payload = {id:user._id}
    return {
      access_token:this.jwtService.sign(payload),
      money:user.money
    }
  }
}