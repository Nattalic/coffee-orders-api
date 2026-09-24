import { OrderEntity } from '../entities/order.entity';
import { describe, it, expect } from '@jest/globals';
import { OrderPreparationEstimateService } from './order-preparation-estimate.service';

describe('OrderPreparationEstimateServiceTest', () => {
  const service = new OrderPreparationEstimateService();

  it('Return order estimate in 0 because status is ready', () => {
    const orderMock = {
      quantity: 0,
      status: 'ready',
      id: 1,
    } as OrderEntity;

    const result = service.estimate(orderMock);

    expect(result.estimatedMinutes).toBe(0);
    expect(result.orderId).toBe(1);
    expect(result.status).toBe('ready');
  });
});
