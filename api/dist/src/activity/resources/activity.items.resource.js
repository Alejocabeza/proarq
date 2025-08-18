"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityItems = void 0;
const activit_items_collections_resource_1 = require("./activit-items.collections.resource");
const activityItems = (activity) => {
    if (!activity)
        return null;
    return {
        id: activity.id,
        name: activity.name,
        items: (0, activit_items_collections_resource_1.activityItemsCollection)(activity.items),
    };
};
exports.activityItems = activityItems;
//# sourceMappingURL=activity.items.resource.js.map