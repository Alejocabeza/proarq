"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const service_category_service_1 = require("./service-category.service");
const service_category_controller_1 = require("./service-category.controller");
const typeorm_1 = require("@nestjs/typeorm");
const service_category_entity_1 = require("./entities/service-category.entity");
const auth_module_1 = require("../auth/auth.module");
let ServiceCategoryModule = class ServiceCategoryModule {
};
exports.ServiceCategoryModule = ServiceCategoryModule;
exports.ServiceCategoryModule = ServiceCategoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [service_category_controller_1.ServiceCategoryController],
        providers: [service_category_service_1.ServiceCategoryService],
        imports: [typeorm_1.TypeOrmModule.forFeature([service_category_entity_1.ServiceCategory]), auth_module_1.AuthModule],
    })
], ServiceCategoryModule);
//# sourceMappingURL=service-category.module.js.map