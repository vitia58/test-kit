import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { CUserDTO } from 'src/auth/dto/CUserDTO';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { COrderDTO } from './dto/COrderDTO';
import { RoomService } from './room.service';

@Controller('room')
@UseGuards(JwtAuthGuard)
export class RoomController {
    constructor(private readonly service:RoomService){}
    @Get(":id/list")
    list(@Param("id",new ValidatorPipe()) id:string,@GetUser() user:CUserDTO){
        return this.service.list(id,user)
    }
    @Get(":id")
    info(@Param("id",new ValidatorPipe()) id:string,@GetUser() user:CUserDTO){
        return this.service.info(id,user)
    }
    @Post("order")
    order(@Body(new ValidatorPipe) order:COrderDTO,@GetUser() user:CUserDTO){
        return this.service.order(order,user)
    }
}

