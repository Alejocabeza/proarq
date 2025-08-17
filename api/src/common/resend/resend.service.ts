import { Injectable } from '@nestjs/common';
import { ResendService as NestjsResendService } from 'nestjs-resend';

@Injectable()
export class ResendService {
  private readonly NODE_ENV = process.env.NODE_ENV;
  constructor(private readonly resendService: NestjsResendService) {}

  async sendEmail(email: string, subject: string, react: any) {
    try {
      const response = await this.resendService.send({
        from: (this.NODE_ENV === 'dev'
          ? process.env.RESEND_EMAIL_FROM_TEST
          : process.env.RESEND_EMAIL_FROM) as string,
        to: (this.NODE_ENV === 'dev'
          ? process.env.RESEND_EMAIL_TO_TEST
          : email) as string,
        subject,
        react,
      });

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
