import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminExpenseDto } from './create-admin-expense.dto';

export class UpdateAdminExpenseDto extends PartialType(CreateAdminExpenseDto) {}
