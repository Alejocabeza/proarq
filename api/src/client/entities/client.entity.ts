import { Address } from '../../address/entities/address.entity';
import { User } from '../../auth/entities/user.entity';
import { Project } from '../../project/entities/project.entity';
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

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 40, nullable: true })
  phone: string;

  @Column('varchar', { length: 20 })
  dni: string;

  @ManyToOne(() => User, (user) => user.clients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Address, (address) => address.client, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  address: Address;

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
