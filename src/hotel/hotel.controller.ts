import { Controller, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
    constructor(private readonly service:HotelService){}
    @Get("list")
    list(){
        return this.service.list()
    }
}

