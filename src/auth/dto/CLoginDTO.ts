import { IsEmail, IsString } from 'class-validator';
export class CLoginDTO {
  @IsString()
  readonly login:string
  @IsString()
  readonly password:string
}