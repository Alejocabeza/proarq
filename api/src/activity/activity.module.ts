import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { ActivityItem } from './entities/activity-items.entity';
import { AuthModule } from '@api/auth/auth.module';
import { ProviderModule } from '@api/provider/provider.module';
import { PriceModule } from '@api/price/price.module';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
  imports: [
    TypeOrmModule.forFeature([Activity, ActivityItem]),
    AuthModule,
    ProviderModule,
    PriceModule,
  ],
})
export class ActivityModule {}
