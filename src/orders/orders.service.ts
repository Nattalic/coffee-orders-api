import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRulesService } from './order-rules/order-rules.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,

    private readonly orderRulesService: OrderRulesService,
  ) {}
  //repositories

  //parte de create
  //se deja de trabajar local y se empieza a trabajar en la base de datos
  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.customerId,
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${createOrderDto.customerId} was not found`,
      );
    }

    //El proceso es:
    // 1. Buscar el cliente relacionado
    // 2. Detener la operación con 404 si no existe.
    // 3. Construir una instancia de `OrderEntity` con `create()`.
    // 4. Ejecutar el `INSERT` mediante `save()`.
    // 5. Devolver la entidad guardada con su id generado.

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

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.findOne(id);

    this.ordersRepository.merge(order, updateOrderDto);

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);

    return this.ordersRepository.remove(order);
  }

  async markAsReady(id: number): Promise<OrderEntity> {
    //buscamos la orden por el id
    const order = await this.findOne(id);

    this.orderRulesService.ensureCanBeMarkedAsReady(order);

    order.status = 'ready';

    return this.ordersRepository.save(order);
  }
}
