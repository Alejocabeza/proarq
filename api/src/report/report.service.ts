import { Injectable } from '@nestjs/common';
import { progressReport } from './documents/progress.report';
import { Project } from '@api/project/entities/project.entity';
import { PdfService } from '@api/common/pdf/pdf.service';

@Injectable()
export class ReportService {
  constructor(private readonly pdfService: PdfService) {}

  async projectProgressReport(project: Project): Promise<PDFKit.PDFDocument> {
    const docDefinitions = progressReport(project);
    return this.pdfService.createPdf(docDefinitions);
  }
}
