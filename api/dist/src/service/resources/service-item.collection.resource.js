"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceItemCollectionResource = void 0;
const serviceItemCollectionResource = (serviceItems) => serviceItems.map((item) => ({
    id: item.id,
    unitedPrice: +item.unitedPrice,
    percentage: +item.percentage,
    activity: {
        id: item.activity.id,
        name: item.activity.name,
    },
}));
exports.serviceItemCollectionResource = serviceItemCollectionResource;
//# sourceMappingURL=service-item.collection.resource.js.map