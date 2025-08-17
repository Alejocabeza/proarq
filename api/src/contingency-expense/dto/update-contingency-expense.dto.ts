import { PartialType } from '@nestjs/mapped-types';
import { CreateContingencyExpenseDto } from './create-contingency-expense.dto';

export class UpdateContingencyExpenseDto extends PartialType(CreateContingencyExpenseDto) {}
