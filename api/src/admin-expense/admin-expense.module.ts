import { Module } from '@nestjs/common';
import { AdminExpenseService } from './admin-expense.service';
import { AdminExpenseController } from './admin-expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminExpense } from './entities/admin-expense.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  controllers: [AdminExpenseController],
  providers: [AdminExpenseService],
  imports: [TypeOrmModule.forFeature([AdminExpense]), AuthModule],
})
export class AdminExpenseModule {}
