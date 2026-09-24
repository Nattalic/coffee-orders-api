import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
// import { DiningTable } from './entities/dining-table.entity';
import { OrderRulesService } from './order-rules/order-rules.service';
import { OrdersSummaryService } from './order-summary/orders-summary.service';
import { OrderPreparationEstimateService } from './order-preparation-estimate/order-preparation-estimate.service';

//registrar entidades en orders module
@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, OrderEntity])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRulesService,
    OrdersSummaryService,
    OrderPreparationEstimateService,
  ],
})
export class OrdersModule {}
