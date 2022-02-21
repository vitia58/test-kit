import { Controller, Get, Param } from '@nestjs/common';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
    constructor(private readonly service:HotelService){}
    @Get("list")
    list(){
        return this.service.list()
    }
    @Get("info/:id")
    get(@Param("id",new ValidatorPipe()) id:string){
        return this.service.get(id)
    }
    
}

