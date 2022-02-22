import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { HotelService } from './hotel.service';

@Controller('hotel')
@UseGuards(JwtAuthGuard)
export class HotelController {
    constructor(private readonly service:HotelService){}
    @Get("list")
    async list(){
        // console.log(await this.service.list())
        return this.service.list()
    }
    @Get("info/:id")
    get(@Param("id",new ValidatorPipe()) id:string){
        return this.service.get(id)
    }
    
}

