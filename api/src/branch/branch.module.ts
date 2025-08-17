import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  controllers: [BranchController],
  providers: [BranchService],
  imports: [TypeOrmModule.forFeature([Branch]), AuthModule],
})
export class BranchModule {}
