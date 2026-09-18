//tablas
//primera tabla de costumer

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('customers') //la tabla se llama costumers ('')
export class CustomerEntity {
  //caracteristicas de la tabla
  @PrimaryGeneratedColumn() //id automatico
  id!: number;

  @Column({ length: 100 }) //el nombre no puede superar los 100 caracteres
  name!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @OneToMany(() => OrderEntity, (order) => order.customer) //uno a muchos
  orders!: OrderEntity[]; //con order entity

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
