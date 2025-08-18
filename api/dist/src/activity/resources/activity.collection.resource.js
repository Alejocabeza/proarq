"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityCollection = void 0;
const activity_items_resource_1 = require("./activity.items.resource");
const activityCollection = (activities) => activities.map((activity) => (0, activity_items_resource_1.activityItems)(activity));
exports.activityCollection = activityCollection;
//# sourceMappingURL=activity.collection.resource.js.map