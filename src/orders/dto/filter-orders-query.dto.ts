/* eslint-disable @typescript-eslint/no-unsafe-call */
//filtrar por ordenes
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class FilterOrdersQueryDto {
  @IsOptional() //podemos filtrar como no podemos filtrar = opcional
  @IsString()
  @IsIn(['pending', 'ready']) //solamente puede tener los valores que tienen aca
  status?: 'pending' | 'ready';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  limit: number = 5;
}
