import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/roboto/Roboto-Regular.ttf',
    bold: 'fonts/roboto/Roboto-Medium.ttf',
    italics: 'fonts/roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/roboto/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class PdfService {
  private printer = new PdfPrinter(fonts);

  createPdf(docDefinitions: TDocumentDefinitions) {
    return this.printer.createPdfKitDocument(docDefinitions);
  }
}
