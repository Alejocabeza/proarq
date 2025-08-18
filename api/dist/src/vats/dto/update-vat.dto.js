"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVatDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vat_dto_1 = require("./create-vat.dto");
class UpdateVatDto extends (0, mapped_types_1.PartialType)(create_vat_dto_1.CreateVatDto) {
}
exports.UpdateVatDto = UpdateVatDto;
//# sourceMappingURL=update-vat.dto.js.map