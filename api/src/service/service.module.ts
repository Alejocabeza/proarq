import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceItem } from './entities/service-item.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [TypeOrmModule.forFeature([Service, ServiceItem]), AuthModule],
})
export class ServiceModule {}
