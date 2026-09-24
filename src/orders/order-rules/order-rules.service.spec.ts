import { BadRequestException, ConflictException } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';
import { OrderRulesService } from './order-rules.service';
import { describe, it, expect } from '@jest/globals';

//probar las reglas/servicio de reglas
//despues del describe es el nombre por el que identificariamos el test
describe('OrderRulesService', () => {
  const service = new OrderRulesService();

  //la orden cumple con las condiciones para estar lista (ready)
  it('allows a pending order with a positive quantity', () => {
    const order = {
      quantity: 2,
      status: 'pending',
    } as OrderEntity;

    expect(() => service.ensureCanBeMarkedAsReady(order)).not.toThrow();
  });

  //si la orden ya esta ready
  it('rejects an order that is already ready', () => {
    const order = {
      quantity: 2,
      status: 'ready',
    } as OrderEntity;

    expect(() => service.ensureCanBeMarkedAsReady(order)).toThrow(
      ConflictException,
    );
  });

  //cuando la cantidad de una orden es 0 o menor
  it('rejects an order with zero quantity', () => {
    expect(() => service.ensureValidQuantity(0)).toThrow(BadRequestException);
  });
});
