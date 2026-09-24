import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRulesService } from './order-rules/order-rules.service';
import { OrderPreparationEstimateService } from './order-preparation-estimate/order-preparation-estimate.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,

    private readonly orderRulesService: OrderRulesService,

    private readonly orderPreparationEstimateService: OrderPreparationEstimateService,
  ) {}

  //deja de trabajar local y se empieza a trabajar en la base de datos
  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    //valida que la cantidad sea mayor que 0
    this.orderRulesService.ensureValidQuantity(createOrderDto.quantity);

    //busca el customer asociado a la orden
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.customerId,
    });

    //i el customer no existe, lanza error 404
    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${createOrderDto.customerId} was not found`,
      );
    }

    const order = this.ordersRepository.create({
      item: createOrderDto.item,
      quantity: createOrderDto.quantity,
      status: 'pending',
      customer,
    });

    return this.ordersRepository.save(order);
  }

  //metodo find all
  async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      relations: {
        customer: true,
      },

      order: {
        id: 'ASC',
      },
    });
  }

  //metodo find one
  async findOne(id: number): Promise<OrderEntity> {
    //busca una orden por su id y trae también la relación con customer
    const order = await this.ordersRepository.findOne({
      where: { id },

      relations: {
        customer: true,
      },
    });

    //si la orden no existe, lanza error 404
    if (!order) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return order;
  }

  //metodo update
  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    //busca primero la orden
    const order = await this.findOne(id);

    //si se quiere modificar quantity,
    //valida que la nueva cantidad sea mayor que 0
    if (updateOrderDto.quantity !== undefined) {
      this.orderRulesService.ensureValidQuantity(updateOrderDto.quantity);
    }

    //mezcla los nuevos datos con la orden existente
    this.ordersRepository.merge(order, updateOrderDto);

    //guarda los cambios en la base de datos
    return this.ordersRepository.save(order);
  }

  //metodo remove
  async remove(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);

    // elimina la orden de la base de datos
    return this.ordersRepository.remove(order);
  }

  //marcar una orden como ready
  async markAsReady(id: number): Promise<OrderEntity> {
    //buscamos la orden por el id
    const order = await this.findOne(id);

    this.orderRulesService.ensureCanBeMarkedAsReady(order);

    order.status = 'ready';

    return this.ordersRepository.save(order);
  }

  //estimar el tiempo de preparacion de una orden
  async estimatePreparation(id: number): Promise<{
    orderId: number;
    status: string;
    estimatedMinutes: number;
  }> {
    //busca la orden por id
    const order = await this.findOne(id);

    //se le manda la orden al service para que estime
    //el tiempo de preparacion de ese pedido
    return this.orderPreparationEstimateService.estimate(order);
  }

  //buscar ordenes recientes con quantity mayor a 2
  async findRecentPending(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      //filtra las ordenes cuya cantidad sea mayor a 2
      where: {
        quantity: MoreThan(2),
      },

      //traer datos de customer tambien
      relations: {
        customer: true,
      },

      //ordenar desde la orden mas reciente
      order: {
        id: 'DESC',
      },

      //traer solo dos datos
      take: 2,
    });
  }
}
