import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //lee el .env
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      //construye la conexion utilizando config service
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', //selecciona el motor
        host: configService.get<string>('DB_HOST') ?? 'localhost',
        port: Number(configService.get<string>('DB_PORT') ?? 5432), // ?? es un condicional
        username: configService.get<string>('DB_USERNAME') ?? 'postgres',
        password: configService.get<string>('DB_PASSWORD') ?? 'postgres',
        database: configService.get<string>('DB_DATABASE') ?? 'coffee_orders',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    OrdersModule,
    LoansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
