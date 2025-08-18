"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceCollection = void 0;
const price_item_1 = require("./price.item");
const priceCollection = (prices) => prices.map((price) => (0, price_item_1.priceItem)(price));
exports.priceCollection = priceCollection;
//# sourceMappingURL=price.collection.js.map