"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeCollectionResources = void 0;
const employee_item_resource_1 = require("./employee-item.resource");
const employeeCollectionResources = (employees) => employees.map((employee) => (0, employee_item_resource_1.employeeItemResources)(employee));
exports.employeeCollectionResources = employeeCollectionResources;
//# sourceMappingURL=employee-collection.resource.js.map