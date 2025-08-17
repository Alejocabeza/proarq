import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategory } from './entities/service-category.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService],
  imports: [TypeOrmModule.forFeature([ServiceCategory]), AuthModule],
})
export class ServiceCategoryModule {}
