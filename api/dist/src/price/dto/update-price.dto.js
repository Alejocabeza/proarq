"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePriceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_price_dto_1 = require("./create-price.dto");
class UpdatePriceDto extends (0, mapped_types_1.PartialType)(create_price_dto_1.CreatePriceDto) {
}
exports.UpdatePriceDto = UpdatePriceDto;
//# sourceMappingURL=update-price.dto.js.map