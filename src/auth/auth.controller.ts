import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CLoginDTO } from './dto/CLoginDTO';
import { CRegisterDTO } from './dto/CRegisterDTO';

@Controller('auth')
export class AuthController {
    constructor(private readonly service:AuthService){}
    @Post("login")
    async login(@Body(new ValidationPipe) login:CLoginDTO){
        console.log(login)
        return this.service.login(login);
    }
    @Post("register")
    async register(@Body(new ValidationPipe) register:CRegisterDTO){
        console.log(register)
        return this.service.register(register);
    }
}

