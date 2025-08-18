"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerItem = void 0;
const address_item_1 = require("../../address/resources/address.item");
const provider_item_collection_1 = require("./provider-item.collection");
const providerItem = (provider) => {
    if (!provider)
        return null;
    return {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        dni: provider.dni,
        address: provider.address ? (0, address_item_1.addressItem)(provider.address) : null,
        items: provider.items ? (0, provider_item_collection_1.providerItemCollection)(provider.items) : null,
    };
};
exports.providerItem = providerItem;
//# sourceMappingURL=provider.item.js.map