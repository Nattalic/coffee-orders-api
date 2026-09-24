import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRulesService {
  ensureCanBeMarkedAsReady(order: OrderEntity): void {
    // si el estado de la orden es diferente a pending
    if (order.status !== 'pending') {
      // lanza un error porque solo las pending pueden ser marcadas como ready
      throw new ConflictException('Only pending orders can be marked as ready');
    }
  }

  ensureValidQuantity(quantity: number): void {
    // valida que la cantidad sea mayor que 0
    if (quantity <= 0) {
      throw new BadRequestException('Order quantity must be greater than 0');
    }
  }
}
