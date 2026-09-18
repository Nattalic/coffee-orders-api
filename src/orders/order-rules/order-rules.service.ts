import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRulesService {
  ensureCanBeMarkedAsReady(order: OrderEntity): void {
    //valida que la lista tenga al menos un item
    if (order.quantity <= 0) {
      throw new BadRequestException('An order must have at least one item');
    }

    //si el estado de la orden es diferente a pending
    if (order.status !== 'pending') {
      //lanza un error que solo las pending pueden ser marcadas como ready
      throw new ConflictException('Only pending orders can be marked as ready');
    }
  }
}
