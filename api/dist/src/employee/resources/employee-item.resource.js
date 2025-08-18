"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeItemResources = void 0;
const employeeItemResources = (employee) => {
    if (!employee)
        return null;
    return {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        dni: employee.dni,
        isActive: employee.isActive,
    };
};
exports.employeeItemResources = employeeItemResources;
//# sourceMappingURL=employee-item.resource.js.map