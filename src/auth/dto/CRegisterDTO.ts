import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
export class CRegisterDTO {
  @IsString()
  readonly login:string
  @IsString()
  readonly userName:string
  @IsString()
  readonly password:string
}