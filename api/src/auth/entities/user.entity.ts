import { ActivityItem } from '../../activity/entities/activity-items.entity';
import { Activity } from '../../activity/entities/activity.entity';
import { Address } from '../../address/entities/address.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { Client } from '../../client/entities/client.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Price } from '../../price/entities/price.entity';
import { Project } from '../../project/entities/project.entity';
import { ProviderItem } from '../../provider/entities/provider-item.entity';
import { Provider } from '../../provider/entities/provider.entity';
import { ServiceCategory } from '../../service-category/entities/service-category.entity';
import { ServiceItem } from '../../service/entities/service-item.entity';
import { Service } from '../../service/entities/service.entity';
import { Setting } from '../../setting/entities/setting.entity';
import { Task } from '../../task/entities/task.entity';
import { Vat } from '../../vats/entities/vat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column('varchar', { length: 20, unique: true, nullable: true })
  dni: string;

  @Column('varchar', { length: 20, nullable: true })
  phone: string;

  @Column('varchar', { nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column('varchar', { nullable: true, name: 'reset_paasword_token' })
  resetPasswordToken: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Branch, (branch) => branch.user)
  branches: Branch[];

  @OneToMany(() => Provider, (provider) => provider.user)
  providers: Provider[];

  @OneToMany(() => ProviderItem, (providerItem) => providerItem.user)
  providerItems: ProviderItem[];

  @OneToMany(() => Price, (price) => price.user)
  prices: Price[];

  @OneToMany(() => Activity, (activity) => activity.user)
  activities: Activity[];

  @OneToMany(() => ActivityItem, (activityItem) => activityItem.user)
  activityItems: ActivityItem[];

  @OneToMany(() => ServiceCategory, (serviceCategory) => serviceCategory.user)
  serviceCategories: ServiceCategory[];

  @OneToMany(() => Service, (service) => service.user)
  services: Service[];

  @OneToMany(() => ServiceItem, (serviceItem) => serviceItem.user)
  serviceItems: ServiceItem[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Employee, (employee) => employee.user)
  employees: Employee[];

  @OneToMany(() => Vat, (vat) => vat.user)
  vats: Vat[];

  @OneToOne(() => Setting, (setting) => setting.user)
  setting: Setting;
}
