"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vatItemResource = void 0;
const vatItemResource = (vat) => {
    if (!vat)
        return null;
    return {
        id: vat.id,
        name: vat.name,
        value: vat.value,
    };
};
exports.vatItemResource = vatItemResource;
//# sourceMappingURL=vat-item.resource.js.map