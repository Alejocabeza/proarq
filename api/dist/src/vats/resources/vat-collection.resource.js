"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vatCollectionResource = void 0;
const vat_item_resource_1 = require("./vat-item.resource");
const vatCollectionResource = (vats) => vats.map((vat) => (0, vat_item_resource_1.vatItemResource)(vat));
exports.vatCollectionResource = vatCollectionResource;
//# sourceMappingURL=vat-collection.resource.js.map