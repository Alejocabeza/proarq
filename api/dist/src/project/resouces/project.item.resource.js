"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectItemResource = void 0;
const task_collection_resouces_1 = require("../../task/resources/task-collection.resouces");
const projectItemResource = (project) => {
    if (!project)
        return null;
    return {
        id: project.id,
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        typeClient: project.typeClient,
        code: project.code,
        address: project.address
            ? {
                id: project.address.id,
                name: project.address.name,
            }
            : null,
        client: project.client
            ? {
                id: project.client.id,
                name: project.client.name,
            }
            : null,
        branch: project.branch
            ? {
                id: project.branch.id,
                name: project.branch.name,
            }
            : null,
        tasks: project.tasks ? (0, task_collection_resouces_1.taskCollectionResource)(project.tasks) : [],
    };
};
exports.projectItemResource = projectItemResource;
//# sourceMappingURL=project.item.resource.js.map