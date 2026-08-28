import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [OrdersModule, LoansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
