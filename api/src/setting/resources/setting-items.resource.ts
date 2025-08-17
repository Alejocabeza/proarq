import { Setting } from '../entities/setting.entity';

export const settingItemsResource = (setting: Setting | null) => {
  if (!setting) return null;
  return {
    id: setting.id,
    locale: setting.locale,
    coin: setting.coin,
    theme: setting.theme,
    isSidebarCollapsed: setting.isSidebarCollapsed,
  };
};
