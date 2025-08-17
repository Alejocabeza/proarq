import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocaleEnum } from '../enum/locale.enum';
import { CoinEnum } from '../enum/coin.enum';
import { ThemeEnum } from '../enum/theme.enum';
import { User } from '../../auth/entities/user.entity';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { default: LocaleEnum.ES })
  locale: LocaleEnum;

  @Column('varchar', { default: CoinEnum.COP })
  coin: CoinEnum;

  @Column('varchar', { default: ThemeEnum.LIGHT })
  theme: ThemeEnum;

  @Column('boolean', { default: false, name: 'is_sidebar_collapsed' })
  isSidebarCollapsed: boolean;

  @OneToOne(() => User, (user) => user.setting, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
