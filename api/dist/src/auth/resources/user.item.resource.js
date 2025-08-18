"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserItemResource = void 0;
const UserItemResource = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dni: user.dni,
        reset_password_token: user.resetPasswordToken,
    };
};
exports.UserItemResource = UserItemResource;
//# sourceMappingURL=user.item.resource.js.map