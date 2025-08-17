import { Module } from '@nestjs/common';
import { VatsService } from './vats.service';
import { VatsController } from './vats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vat } from './entities/vat.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  controllers: [VatsController],
  providers: [VatsService],
  imports: [TypeOrmModule.forFeature([Vat]), AuthModule],
})
export class VatsModule {}
