"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskCollectionResource = void 0;
const task_item_resouces_1 = require("./task-item.resouces");
const taskCollectionResource = (tasks) => tasks.map((task) => (0, task_item_resouces_1.taskItemResources)(task));
exports.taskCollectionResource = taskCollectionResource;
//# sourceMappingURL=task-collection.resouces.js.map