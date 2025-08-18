"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerItemCollection = void 0;
const providerItemCollection = (providerItem) => providerItem.map((providerItem) => ({
    id: providerItem.id,
    name: providerItem.name,
    amount: +providerItem.amount,
}));
exports.providerItemCollection = providerItemCollection;
//# sourceMappingURL=provider-item.collection.js.map