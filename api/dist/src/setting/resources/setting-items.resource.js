"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingItemsResource = void 0;
const settingItemsResource = (setting) => {
    if (!setting)
        return null;
    return {
        id: setting.id,
        locale: setting.locale,
        coin: setting.coin,
        theme: setting.theme,
        isSidebarCollapsed: setting.isSidebarCollapsed,
    };
};
exports.settingItemsResource = settingItemsResource;
//# sourceMappingURL=setting-items.resource.js.map