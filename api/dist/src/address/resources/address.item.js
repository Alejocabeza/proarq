"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressItem = void 0;
const addressItem = (address) => {
    if (!address)
        return null;
    return {
        id: address.id,
        name: address.name,
        country: address.country,
        state: address.state,
        city: address.city,
        postalCode: address.postalCode,
        mainAddress: address.mainAddress,
    };
};
exports.addressItem = addressItem;
//# sourceMappingURL=address.item.js.map