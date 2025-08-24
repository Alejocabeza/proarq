import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Activity } from './activity.entity';
import { Provider } from '../../provider/entities/provider.entity';
import { ProviderItem } from '../../provider/entities/provider-item.entity';
import { Price } from '../../price/entities/price.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('activity_items')
export class ActivityItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @ManyToOne(() => Provider, (provider) => provider.activityItems, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  provider: Provider;

  @ManyToOne(() => ProviderItem, (providerItem) => providerItem.activityItems, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  providerItem: ProviderItem;

  @ManyToOne(() => Activity, (activity) => activity.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  activity: Activity;

  @ManyToOne(() => Price, (price) => price.activityItems, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  price: Price;

  @ManyToOne(() => User, (user) => user.activityItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column('integer')
  percentage: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
