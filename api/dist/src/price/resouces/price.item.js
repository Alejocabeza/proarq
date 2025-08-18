"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceItem = void 0;
const priceItem = (price) => {
    if (!price)
        return null;
    return {
        id: price.id,
        name: price.name,
        amount: +price.amount,
    };
};
exports.priceItem = priceItem;
//# sourceMappingURL=price.item.js.map