"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceCategoryCollection = void 0;
const service_category_item_resource_1 = require("./service-category-item.resource");
const serviceCategoryCollection = (categories) => categories.map((category) => (0, service_category_item_resource_1.serviceCategoryItem)(category));
exports.serviceCategoryCollection = serviceCategoryCollection;
//# sourceMappingURL=service-category-collection.resource.js.map