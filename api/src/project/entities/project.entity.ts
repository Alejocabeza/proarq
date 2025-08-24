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
import { TypeClientEnum } from '../enum/type-client.enum';
import { Client } from '../../client/entities/client.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { User } from '../../auth/entities/user.entity';
import { Address } from '../../address/entities/address.entity';
import { Task } from '../../task/entities/task.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('int', { nullable: true })
  code: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('date', {
    default: new Date().toISOString().split('T')[0],
    name: 'start_date',
  })
  startDate: Date;

  @Column('date', {
    default: new Date().toISOString().split('T')[0],
    name: 'end_date',
  })
  endDate: Date;

  @Column('varchar', { name: 'type_client' })
  typeClient: TypeClientEnum;

  @ManyToOne(() => Client, (client) => client.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  client: Client;

  @ManyToOne(() => Branch, (branch) => branch.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  branch: Branch;

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  user: User;

  @ManyToOne(() => Address, (address) => address.project, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  address: Address;

  @OneToMany(() => Task, (task) => task.project, { eager: true })
  tasks: Task[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
