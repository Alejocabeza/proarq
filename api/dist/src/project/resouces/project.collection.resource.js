"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectCollectionResource = void 0;
const project_item_resource_1 = require("./project.item.resource");
const projectCollectionResource = (projects) => projects.map((project) => (0, project_item_resource_1.projectItemResource)(project));
exports.projectCollectionResource = projectCollectionResource;
//# sourceMappingURL=project.collection.resource.js.map