import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {Types} from "mongoose"
@Injectable()
export class ValidatorPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if(metadata.type==="param"){
      if(!Types.ObjectId.isValid(value))throw new BadRequestException("Id isn't valid")
    }else if(metadata.type=="body"){
      const object = plainToClass(metadata.metatype, value);
      const errors = await validate(object,{whitelist: true, forbidNonWhitelisted: true});
      if(errors.length>0)throw new BadRequestException(errors[0].constraints.whitelistValidation??`${errors[0].property} isn't valid`)
    }
    return value;
  }
}
