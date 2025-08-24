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
import { ProviderItem } from './provider-item.entity';
import { User } from '../../auth/entities/user.entity';
import { Address } from '../../address/entities/address.entity';
import { ActivityItem } from '../../activity/entities/activity-items.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 40, nullable: true })
  phone: string;

  @Column('varchar', { length: 20 })
  dni: string;

  @ManyToOne(() => User, (user) => user.providers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Address, (address) => address.provider, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  address: Address;

  @OneToMany(() => ProviderItem, (item) => item.provider, {
    eager: true,
  })
  items: ProviderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => ActivityItem, (activityItem) => activityItem.provider)
  activityItems: ActivityItem[];
}
