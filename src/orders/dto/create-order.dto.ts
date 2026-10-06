/* eslint-disable @typescript-eslint/no-unsafe-call */
//editamos el dto  para que tenga validaciones
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty() //no se puede dejar vacio
  @MaxLength(60) //maximo 60
  item!: string;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  customerId!: number;
}

//el contrato
//describe los datos que esperamos recibir al crear uno. El cliente no envía id ni status: la aplicación los asignará.
//el dto se uso cuando hay que mandar un post
