export class CreateOrderDto {
  customer!: string;
  item!: string;
}

//describe los datos que esperamos recibir al crear uno. El cliente no envía id ni status: la aplicación los asignará.
//el dto se uso cuando hay que mandar un post
