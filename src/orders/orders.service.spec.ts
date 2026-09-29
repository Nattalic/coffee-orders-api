import { beforeEach, describe, jest, it, expect } from '@jest/globals';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { NotFoundException } from '@nestjs/common';
import { OrderRulesService } from './order-rules/order-rules.service';
import { OrderPreparationEstimateService } from './order-preparation-estimate/order-preparation-estimate.service';

void describe('OrdersServiceTest', () => {
  let service: OrdersService;

  //se mockean las funciones o dependencias que se utilice orders repository
  const repositoryMock = {
    find: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn<(options: any) => Promise<OrderEntity | null>>(),
    create: jest.fn(),
    merge: jest.fn(),
  };

  const customerMock = {
    findOneBy: jest.fn(),
  };

  //siempre debemso buscar que funciones o dependencias  utilizan los metodos
  const orderRulesServiceMock = {
    ensureCanBeMarkedAsReady: jest.fn(),
  };

  const orderPreparationEstimateServiceMock = {
    estimate: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    //modulo de referencia (modulo de testing)
    const moduleRef = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          //order service tiene relacion con esta entiedad ( order entity)
          provide: getRepositoryToken(OrderEntity),
          useValue: repositoryMock,
        },
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: customerMock,
        },
        {
          //como no son repository es diferente
          provide: OrderRulesService,
          useValue: orderRulesServiceMock,
        },

        {
          provide: OrderPreparationEstimateService,
          useValue: orderPreparationEstimateServiceMock,
        },
      ],
    }).compile();

    service = moduleRef.get(OrdersService);
  });

  it('requests the five most recent pending orders', async () => {
    // Arrange: preparar datos y respuestas simuladas.
    const orderMock = {
      id: 7,
      item: 'Cappuccino',
      quantity: 2,
      status: 'pending',
      customer: {
        id: 3,
        name: 'Laura',
        email: 'laura@example.com',
      },
    } as OrderEntity;

    //cuando es asincrona
    repositoryMock.findOne.mockResolvedValue(orderMock);

    // Act:  ejecutar el método que se desea probar.
    const result = await service.findOne(7);

    // Assert:  parte de esperar o lo que yo espero que pase --- expect(result).toEqual(order);
    expect(result).toEqual(orderMock);
    expect(repositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: 7 },
      relations: { customer: true },
    });
  });

  it('throws NotFoundException when the order does not exist', async () => {
    // Arrange
    repositoryMock.findOne.mockResolvedValue(null);

    // Act and Assert
    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
