import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { Activity } from '../../activity/entities/activity.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('service_items')
export class ServiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2, name: 'united_price' })
  unitedPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  percentage: number;

  @ManyToOne(() => Service, (service) => service.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  service: Service;

  @ManyToOne(() => Activity, (activity) => activity.serviceItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  activity: Activity;

  @ManyToOne(() => User, (user) => user.serviceItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
