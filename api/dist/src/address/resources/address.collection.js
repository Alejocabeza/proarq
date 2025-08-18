"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressCollection = void 0;
const address_item_1 = require("./address.item");
const addressCollection = (addresses) => {
    return addresses.map((address) => (0, address_item_1.addressItem)(address));
};
exports.addressCollection = addressCollection;
//# sourceMappingURL=address.collection.js.map