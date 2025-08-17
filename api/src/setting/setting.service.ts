import { HttpException, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { settingItemsResource } from './resources/setting-items.resource';
// import { LocaleEnum } from './enum/locale.enum';
// import { CoinEnum } from './enum/coin.enum';
// import { ThemeEnum } from './enum/theme.enum';
import { Response } from 'express';
import { User } from '@api/auth/entities/user.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async create(user: User, res: Response, createSettingDto?: CreateSettingDto) {
    try {
      // const defaultSetting = {
      //   locale: LocaleEnum.ES,
      //   coin: CoinEnum.COP,
      //   theme: ThemeEnum.LIGHT,
      //   isSidebarCollapsed: false,
      // };

      const setting = await this.settingRepository.create({
        ...createSettingDto,
        user,
      });

      await this.settingRepository.save(setting);

      return {
        message: 'Setting created successfully.',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(user: User) {
    try {
      const setting = await this.settingRepository.findOne({
        where: { user: { id: user.id } },
      });
      return settingItemsResource(setting);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(user: User, updateSettingDto: UpdateSettingDto) {
    try {
      await this.settingRepository.update({ user }, updateSettingDto);
      return {
        message: 'Setting updated successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
