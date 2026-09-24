import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersSummaryService } from './order-summary/orders-summary.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly ordersSummaryService: OrdersSummaryService,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('summary')
  getSummary() {
    return this.ordersSummaryService.getSummary();
  }

  @Get('pending')
  findRecentPending() {
    return this.ordersService.findRecentPending();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(Number(id), updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(Number(id));
  }

  @Patch(':id/ready')
  markAsReady(@Param('id') id: string) {
    return this.ordersService.markAsReady(Number(id));
  }

  @Get(':id/estimate')
  estimatePreparationTime(@Param('id') id: string) {
    return this.ordersService.estimatePreparation(Number(id));
  }

  @Get(':id/priority')
  getPriority(@Param('id') id: string) {
    return this.ordersService.getPriority(Number(id));
  }
}
