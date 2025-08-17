import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { ProviderItem } from './entities/provider-item.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [TypeOrmModule.forFeature([Provider, ProviderItem]), AuthModule],
  exports: [ProviderService],
})
export class ProviderModule {}
