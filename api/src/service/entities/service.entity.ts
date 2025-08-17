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
import { UnitEnum } from '../enum/unit.enum';
import { ServiceItem } from './service-item.entity';
import { ServiceCategory } from '../../service-category/entities/service-category.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar')
  unit: UnitEnum;

  @Column('float')
  quantity: number;

  @ManyToOne(
    () => ServiceCategory,
    (serviceCategory) => serviceCategory.services,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  serviceCategory: ServiceCategory;

  @ManyToOne(() => User, (user) => user.services, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => ServiceItem, (items) => items.service, {
    eager: true,
  })
  items: ServiceItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
