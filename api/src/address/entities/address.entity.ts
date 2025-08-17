import { User } from '../../auth/entities/user.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { Client } from '../../client/entities/client.entity';
import { Project } from '../../project/entities/project.entity';
import { Provider } from '../../provider/entities/provider.entity';
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

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  country: string;

  @Column('varchar', { length: 100 })
  state: string;

  @Column('varchar', { length: 100 })
  city: string;

  @Column('varchar', { length: 100, name: 'postal_code' })
  postalCode: string;

  @Column('varchar', { length: 100, name: 'main_address' })
  mainAddress: string;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: string;

  @OneToMany(() => Client, (client) => client.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  client: string;

  @OneToMany(() => Branch, (branch) => branch.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  branch: string;

  @OneToMany(() => Project, (project) => project.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  project: string;

  @OneToMany(() => Provider, (provider) => provider.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  provider: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
