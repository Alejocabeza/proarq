import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { ClientModule } from './client/client.module';
import { BranchModule } from './branch/branch.module';
import { ProviderModule } from './provider/provider.module';
import { PriceModule } from './price/price.module';
import { ActivityModule } from './activity/activity.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { CommonModule } from './common/common.module';
import { ServiceModule } from './service/service.module';
import { ProjectModule } from './project/project.module';
import { ReportModule } from './report/report.module';
import { TaskModule } from './task/task.module';
import { EmployeeModule } from './employee/employee.module';
import { VatsModule } from './vats/vats.module';
import { AdminExpenseModule } from './admin-expense/admin-expense.module';
import { ContingencyExpenseModule } from './contingency-expense/contingency-expense.module';
import { UtilityExpenseModule } from './utility-expense/utility-expense.module';
import { SettingModule } from './setting/setting.module';
import { typeormModuleOptions } from '../typeOrm.config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormModuleOptions),
    AuthModule,
    AddressModule,
    ClientModule,
    BranchModule,
    ProviderModule,
    PriceModule,
    ActivityModule,
    ServiceCategoryModule,
    CommonModule,
    ServiceModule,
    ProjectModule,
    ReportModule,
    TaskModule,
    EmployeeModule,
    VatsModule,
    AdminExpenseModule,
    ContingencyExpenseModule,
    UtilityExpenseModule,
    SettingModule,
    RedisModule,
  ],
})
export class AppModule {}
