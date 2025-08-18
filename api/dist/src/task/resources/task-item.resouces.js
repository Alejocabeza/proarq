"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskItemResources = void 0;
const taskItemResources = (task) => {
    if (!task)
        return null;
    return {
        id: task.id,
        name: task.name,
        startDate: task.startDate,
        endDate: task.endDate,
        description: task.description,
        status: task.status,
        project: task.project
            ? {
                id: task.project.id,
                name: task.project.name,
            }
            : null,
    };
};
exports.taskItemResources = taskItemResources;
//# sourceMappingURL=task-item.resouces.js.map