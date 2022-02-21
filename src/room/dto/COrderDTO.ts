import { IsMongoId } from 'class-validator';
export class COrderDTO {
  @IsMongoId()
  readonly id:string
}