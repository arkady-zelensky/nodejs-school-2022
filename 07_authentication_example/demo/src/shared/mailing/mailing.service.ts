import { Inject, Injectable } from "@nestjs/common";
import { MailingConfig, mailingConfig } from "src/config/mailing.config";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailingService {
  private transport: nodemailer.Transporter<nodemailer.SentMessageInfo>;

  constructor(@Inject(mailingConfig.KEY) private mailingConf: MailingConfig) {
    this.transport = nodemailer.createTransport({
      ...mailingConf,
      secure: true,
      requireTLS: true,
    });
  }

  async sendVerificationEmail(
    to: string,
    verificationLink: string
  ): Promise<void> {
    await this.sendEmail(
      to,
      "Email verification needed",
      `<a href="${verificationLink}">Click to verify</a>`
    );
  }

  async sendResetPasswordEmail(
    to: string,
    resetPasswordLink: string
  ): Promise<void> {
    await this.sendEmail(
      to,
      "Reset password",
      `<a href="${resetPasswordLink}">Click to reset password</a>`
    );
  }

  async sendTwoFaCodeEmail(to: string, code: string) {
    await this.sendEmail(to, "2FA code", code);
  }

  private async sendEmail(
    to: string,
    subject: string,
    body: string
  ): Promise<void> {
    await this.transport.sendMail({
      from: this.mailingConf.auth.user,
      to,
      subject,
      html: body,
    });
  }
}
