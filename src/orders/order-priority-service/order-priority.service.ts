import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderPriorityService {
  classify(order: OrderEntity): {
    priority: string;
    message: string;
  } {
    //si pedido ready siempre sera completed
    if (order.status === 'ready') {
      return {
        priority: 'completed',
        message: 'order is ready',
      };
    }

    //si pending y tiene 4 quantity o mas
    if (order.quantity >= 4) {
      return {
        priority: 'high',
        message: 'prepare this order soon',
      };
    }

    //si pending y tiene entre 2 o 3 quantity
    if (order.quantity >= 2) {
      return {
        priority: 'medium',
        message: 'order has medium priority',
      };
    }

    //si pending y tiene 1 quantity
    return {
      priority: 'normal',
      message: 'ordar has normal priority',
    };
  }
}
