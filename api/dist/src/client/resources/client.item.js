"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientItem = void 0;
const address_item_1 = require("../../address/resources/address.item");
const clientItem = (client) => {
    if (!client)
        return null;
    return {
        id: client.id,
        name: client.name,
        email: client.email,
        dni: client.dni,
        phone: client.phone,
        address: client.address ? (0, address_item_1.addressItem)(client.address) : null,
    };
};
exports.clientItem = clientItem;
//# sourceMappingURL=client.item.js.map