"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_resend_1 = require("nestjs-resend");
let ResendService = class ResendService {
    constructor(resendService) {
        this.resendService = resendService;
        this.NODE_ENV = process.env.NODE_ENV;
    }
    async sendEmail(email, subject, react) {
        try {
            const response = await this.resendService.send({
                from: (this.NODE_ENV === 'dev'
                    ? process.env.RESEND_EMAIL_FROM_TEST
                    : process.env.RESEND_EMAIL_FROM),
                to: (this.NODE_ENV === 'dev'
                    ? process.env.RESEND_EMAIL_TO_TEST
                    : email),
                subject,
                react,
            });
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.ResendService = ResendService;
exports.ResendService = ResendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_resend_1.ResendService])
], ResendService);
//# sourceMappingURL=resend.service.js.map