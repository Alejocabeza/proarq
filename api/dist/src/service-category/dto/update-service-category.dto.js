"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_service_category_dto_1 = require("./create-service-category.dto");
class UpdateServiceCategoryDto extends (0, mapped_types_1.PartialType)(create_service_category_dto_1.CreateServiceCategoryDto) {
}
exports.UpdateServiceCategoryDto = UpdateServiceCategoryDto;
//# sourceMappingURL=update-service-category.dto.js.map