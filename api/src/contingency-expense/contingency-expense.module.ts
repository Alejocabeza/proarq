import { Module } from '@nestjs/common';
import { ContingencyExpenseService } from './contingency-expense.service';
import { ContingencyExpenseController } from './contingency-expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContingencyExpense } from './entities/contingency-expense.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  controllers: [ContingencyExpenseController],
  providers: [ContingencyExpenseService],
  imports: [TypeOrmModule.forFeature([ContingencyExpense]), AuthModule],
})
export class ContingencyExpenseModule {}
