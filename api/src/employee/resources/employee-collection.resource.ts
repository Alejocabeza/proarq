import { Employee } from '../entities/employee.entity';
import { employeeItemResources } from './employee-item.resource';

export const employeeCollectionResources = (employees: Employee[]) =>
  employees.map((employee) => employeeItemResources(employee));
