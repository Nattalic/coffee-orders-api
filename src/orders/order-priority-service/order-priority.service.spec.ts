import { expect, describe, it } from '@jest/globals';
import { OrderEntity } from '../entities/order.entity';
import { OrderPriorityService } from './order-priority.service';

describe('OrderPriorityServiceTest', () => {
  const service = new OrderPriorityService();

  //pending con cantidad 1
  it('returns normal priority for a pending order with quantity 1', () => {
    const order = {
      quantity: 1,
      status: 'pending',
    } as OrderEntity;

    const result = service.classify(order);

    expect(result.priority).toBe('normal');
  });

  //pending con cantidad 3
  it('returns medium priority for a pending order with quantity 3', () => {
    const order = {
      quantity: 3,
      status: 'pending',
    } as OrderEntity;

    const result = service.classify(order);

    expect(result.priority).toBe('medium');
  });

  //pending con cantidad 4
  it('returns high priority for a pending order with quantity 4', () => {
    const order = {
      quantity: 4,
      status: 'pending',
    } as OrderEntity;

    const result = service.classify(order);

    expect(result.priority).toBe('high');
  });

  //ready con cantidad 5
  it('returns completed priority for a ready order with quantity 5', () => {
    const order = {
      quantity: 5,
      status: 'ready',
    } as OrderEntity;

    const result = service.classify(order);

    expect(result.priority).toBe('completed');
  });
});
