import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersSummaryService } from './order-summary/orders-summary.service';
import { FilterOrdersQueryDto } from './dto/filter-orders-query.dto';

//ponerlo dentro de un marco para saber que debe ejecutarse
const requestValidationPipe = new ValidationPipe({
  transform: true, //entrega una instancia del DTO, conecta el request con el dto
  whitelist: true, // permite únicamente las propiedades que tienen decoradores de validación
  forbidNonWhitelisted: true, //permite rechazar las propiedades no permitidas en el dto con 400
});

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly ordersSummaryService: OrdersSummaryService,
  ) {}

  //se pone en los body en la request
  @Post()
  create(@Body(requestValidationPipe) dto: CreateOrderDto) {
    return this.ordersService.create(dto);
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

  @Get('pending-queue')
  findPendingQueue() {
    return this.ordersService.findPendingQueue();
  }

  @Get('search')
  search(@Query(requestValidationPipe) query: FilterOrdersQueryDto) {
    return this.ordersService.findFiltered(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
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
  markAsReady(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.markAsReady(id);
  }

  @Get(':id/estimate')
  //validar que el id sea un numero, el pipe lo transforma a numero (entero)
  //valida y transforma = pipe
  estimatePreparationTime(@Param('id') id: string) {
    return this.ordersService.estimatePreparation(Number(id));
  }

  @Get(':id/priority')
  getPriority(@Param('id') id: string) {
    return this.ordersService.getPriority(Number(id));
  }
}
