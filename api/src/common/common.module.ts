import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResendModule } from 'nestjs-resend';
import { ResendService } from './resend/resend.service';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [
    ConfigModule,
    ResendModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get<string>('RESEND_API_KEY') as string,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ResendService, PdfService],
  exports: [ResendService, PdfService],
})
export class CommonModule {}
