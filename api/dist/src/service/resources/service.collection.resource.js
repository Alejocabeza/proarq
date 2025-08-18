"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceCollectionResource = void 0;
const service_item_resource_1 = require("./service.item.resource");
const serviceCollectionResource = (services) => services.map((service) => (0, service_item_resource_1.serviceItemResource)(service));
exports.serviceCollectionResource = serviceCollectionResource;
//# sourceMappingURL=service.collection.resource.js.map