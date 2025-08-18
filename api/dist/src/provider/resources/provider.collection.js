"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerCollection = void 0;
const provider_item_1 = require("./provider.item");
const providerCollection = (providers) => {
    return providers.map((provider) => (0, provider_item_1.providerItem)(provider));
};
exports.providerCollection = providerCollection;
//# sourceMappingURL=provider.collection.js.map