import { Module } from '@nestjs/common';
import { UtilityExpenseService } from './utility-expense.service';
import { UtilityExpenseController } from './utility-expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilityExpense } from './entities/utility-expense.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  controllers: [UtilityExpenseController],
  providers: [UtilityExpenseService],
  imports: [TypeOrmModule.forFeature([UtilityExpense]), AuthModule],
})
export class UtilityExpenseModule {}
