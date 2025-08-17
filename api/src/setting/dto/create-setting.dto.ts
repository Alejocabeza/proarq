import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { LocaleEnum } from '../enum/locale.enum';
import { CoinEnum } from '../enum/coin.enum';
import { ThemeEnum } from '../enum/theme.enum';

export class CreateSettingDto {
  @IsEnum(LocaleEnum)
  @IsOptional()
  locale: LocaleEnum;

  @IsEnum(LocaleEnum)
  @IsOptional()
  coin: CoinEnum;

  @IsEnum(ThemeEnum)
  @IsOptional()
  theme: ThemeEnum;

  @IsOptional()
  @IsBoolean()
  isSidebarCollapsed: boolean;
}
