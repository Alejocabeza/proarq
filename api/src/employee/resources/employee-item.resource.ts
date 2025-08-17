import { Employee } from '../entities/employee.entity';

export const employeeItemResources = (employee: Employee | null) => {
  if (!employee) return null;
  return {
    id: employee.id,
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    dni: employee.dni,
    isActive: employee.isActive,
  };
};
