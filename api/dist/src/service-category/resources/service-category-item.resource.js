"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceCategoryItem = void 0;
const serviceCategoryItem = (category) => {
    if (!category)
        return null;
    return {
        id: category.id,
        name: category.name,
    };
};
exports.serviceCategoryItem = serviceCategoryItem;
//# sourceMappingURL=service-category-item.resource.js.map