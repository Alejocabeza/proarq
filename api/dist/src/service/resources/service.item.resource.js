"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceItemResource = void 0;
const service_item_collection_resource_1 = require("./service-item.collection.resource");
const serviceItemResource = (service) => {
    if (!service)
        return null;
    return {
        id: service.id,
        name: service.name,
        unit: service.unit,
        quantity: service.quantity,
        serviceCategory: {
            id: service.serviceCategory.id,
            name: service.serviceCategory.name,
        },
        items: (0, service_item_collection_resource_1.serviceItemCollectionResource)(service.items),
    };
};
exports.serviceItemResource = serviceItemResource;
//# sourceMappingURL=service.item.resource.js.map