"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.branchItem = void 0;
const address_item_1 = require("../../address/resources/address.item");
const branchItem = (branch) => {
    if (!branch)
        return null;
    return {
        id: branch.id,
        name: branch.name,
        email: branch.email,
        phone: branch.phone,
        dni: branch.dni,
        address: branch.address ? (0, address_item_1.addressItem)(branch.address) : null,
    };
};
exports.branchItem = branchItem;
//# sourceMappingURL=branch.item.js.map