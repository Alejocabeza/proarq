import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { CommonModule } from '@api/common/common.module';

@Module({
  providers: [ReportService],
  imports: [CommonModule],
  exports: [ReportService],
})
export class ReportModule {}
