import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';

@Module({
  providers: [SettingService],
  imports: [TypeOrmModule.forFeature([Setting])],
  exports: [SettingService],
})
export class SettingModule {}
