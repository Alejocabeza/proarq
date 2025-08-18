"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.branchCollection = void 0;
const branch_item_1 = require("./branch.item");
const branchCollection = (branches) => {
    return branches.map((branch) => (0, branch_item_1.branchItem)(branch));
};
exports.branchCollection = branchCollection;
//# sourceMappingURL=branch.collection.js.map