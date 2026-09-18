export class CreateOrderDto {
  item!: string;
  quantity!: number;
  customerId!: number;
}

//el contrato
//describe los datos que esperamos recibir al crear uno. El cliente no envía id ni status: la aplicación los asignará.
//el dto se uso cuando hay que mandar un post
