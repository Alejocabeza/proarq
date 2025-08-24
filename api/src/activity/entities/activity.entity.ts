import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActivityItem } from './activity-items.entity';
import { User } from '../../auth/entities/user.entity';
import { ServiceItem } from '../../service/entities/service-item.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @ManyToOne(() => User, (user) => user.activities, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => ActivityItem, (activityItem) => activityItem.activity, {
    eager: true,
  })
  items: ActivityItem[];

  @OneToMany(() => ServiceItem, (serviceItem) => serviceItem.activity)
  serviceItems: ServiceItem[];

  @Column('decimal', {
    name: 'united_price',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  unitedPrice: number;

  @Column('decimal', {
    name: 'percentage_amount',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  percentageAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
