"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_resend_1 = require("nestjs-resend");
const resend_service_1 = require("./resend/resend.service");
const pdf_service_1 = require("./pdf/pdf.service");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            nestjs_resend_1.ResendModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    apiKey: configService.get('RESEND_API_KEY'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [resend_service_1.ResendService, pdf_service_1.PdfService],
        exports: [resend_service_1.ResendService, pdf_service_1.PdfService],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map