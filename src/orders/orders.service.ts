import { Injectable } from '@nestjs/common';
import { Order } from './order.interface';

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    //base de datos equis
    { id: 1, customer: 'Laura', item: 'Café latte', status: 'pending' },
    { id: 2, customer: 'Mateo', item: 'Sándwich', status: 'ready' },
  ];

  getAllOrders(): Order[] {
    return this.orders;
  }
}
