"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientCollection = void 0;
const client_item_1 = require("./client.item");
const clientCollection = (clients) => {
    return clients.map((client) => (0, client_item_1.clientItem)(client));
};
exports.clientCollection = clientCollection;
//# sourceMappingURL=client.collection.js.map