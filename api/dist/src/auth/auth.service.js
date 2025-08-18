"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_item_resource_1 = require("./resources/user.item.resource");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const setting_service_1 = require("../setting/setting.service");
const resend_service_1 = require("../common/resend/resend.service");
let AuthService = class AuthService {
    constructor(userRepository, settingService, jwtService, configService, resendService) {
        this.userRepository = userRepository;
        this.settingService = settingService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.resendService = resendService;
    }
    async register(registerDto, res) {
        try {
            const { password } = registerDto, rest = __rest(registerDto, ["password"]);
            const user = this.userRepository.create(Object.assign(Object.assign({}, rest), { password: bcrypt.hashSync(password, 10) }));
            await this.userRepository.save(user);
            await this.settingService.create(user, res);
            return {
                message: 'User created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            if (error.code === '23505')
                throw new common_1.BadRequestException(error.detail);
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async login(loginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (!checkPassword)
                throw new common_1.BadRequestException('Password incorrect');
            const access_token = this.jwtService.sign({ id: user.id });
            const refreshToken = this.jwtService.sign({ id: user.id }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            });
            await this.userRepository.update(user.id, { refreshToken });
            return Object.assign(Object.assign({}, (0, user_item_resource_1.UserItemResource)(user)), { access_token, refresh_token: refreshToken, expires_in: this.jwtService.decode(access_token).exp });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(data) {
        try {
            const { id } = data;
            const user = await this.userRepository.findOne({
                where: { id },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            return Object.assign({}, (0, user_item_resource_1.UserItemResource)(user));
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(data, updateUserDto) {
        try {
            const { id } = data;
            const user = await this.userRepository.findOne({
                where: { id },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            await this.userRepository.update(user.id, updateUserDto);
            return {
                message: 'User updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async refreshToken(refreshTokenDto) {
        try {
            const { refreshToken } = refreshTokenDto;
            const user = await this.userRepository.findOne({
                where: { refreshToken: refreshToken },
            });
            if (!user || user.refreshToken !== refreshToken) {
                throw new common_1.NotFoundException('User not found or invalid refresh token');
            }
            const payload = { id: user.id };
            const newAccessToken = this.jwtService.sign(payload);
            const newRefreshToken = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            });
            await this.userRepository.update(user.id, {
                refreshToken: newRefreshToken,
            });
            return Object.assign(Object.assign({}, (0, user_item_resource_1.UserItemResource)(user)), { access_token: newAccessToken, refresh_token: newRefreshToken, expires_in: this.jwtService.decode(newAccessToken).exp });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async forgotPassword({ email, url: frontUrl }) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user)
                throw new common_1.NotFoundException('User Not Found');
            await this.userRepository.update(user.id, {
                resetPasswordToken: this.jwtService.sign({ id: user.id }, {
                    secret: this.configService.get('JWT_REFRESH_SECRET'),
                    expiresIn: '1h',
                }),
            });
            const url = `${frontUrl}?token=${user.resetPasswordToken}`;
            return {
                message: 'Sent Email Successfully',
                statsCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async changePassword({ password, token }) {
        try {
            const user = await this.userRepository.findOne({
                where: { resetPasswordToken: token },
            });
            if (!user)
                throw new common_1.NotFoundException('User Not Found or Invalid Token');
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (comparePassword)
                throw new common_1.BadRequestException('Password is the same');
            await this.userRepository.update(user.id, {
                password: bcrypt.hashSync(password, 10),
            });
            return {
                message: 'Password Changed Successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async getSetting(user) {
        return this.settingService.findOne(user);
    }
    async updateSetting(user, updateSettingDto) {
        return this.settingService.update(user, updateSettingDto);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        setting_service_1.SettingService,
        jwt_1.JwtService,
        config_1.ConfigService,
        resend_service_1.ResendService])
], AuthService);
//# sourceMappingURL=auth.service.js.map