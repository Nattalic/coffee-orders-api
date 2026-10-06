/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty() //no se puede dejar vacio
  @MaxLength(60) //maximo 60
  item?: string;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity?: number;

  @IsOptional() //podemos filtrar como no podemos filtrar = opcional
  @IsString()
  @IsIn(['pending', 'ready']) //solamente puede tener los valores que tienen aca
  status?: 'pending' | 'ready';
}
