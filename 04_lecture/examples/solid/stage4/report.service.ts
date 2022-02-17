import { writeFile } from "fs";
import { DailyReportPDFTemplate } from "./templates/daily-report.pdf-template";
import { PuppeteerPDFGenerator } from "./puppeteer.pdf-generator";
import { WeeklyReportPDFTemplate } from "./templates/weekly-report.pdf-template";

export class ReportService {
  constructor(private pdfGenerator: PuppeteerPDFGenerator) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new DailyReportPDFTemplate(date, totalNumber);

    const pdfBuffer = await this.pdfGenerator.generatePDF(template);

    await new Promise((resolve) =>
      writeFile("./dailyReport.pdf", pdfBuffer, resolve)
    );
  }

  public async createWeeklyReport(
    dateFrom: Date,
    dateTo: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new WeeklyReportPDFTemplate(dateFrom, dateTo, totalNumber);

    const pdfBuffer = await this.pdfGenerator.generatePDF(template);

    await new Promise((resolve) =>
      writeFile("./weeklyReport.pdf", pdfBuffer, resolve)
    );
  }
}
