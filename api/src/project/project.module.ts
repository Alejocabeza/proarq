import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AuthModule } from '@api/auth/auth.module';
import { CommonModule } from '@api/common/common.module';
import { ReportModule } from '@api/report/report.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([Project]),
    AuthModule,
    CommonModule,
    ReportModule,
  ],
})
export class ProjectModule {}
