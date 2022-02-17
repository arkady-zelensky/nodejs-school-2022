import { writeFile } from "fs";
import { dailyReportTemplate } from "./templates/daily-report.pdf-template";
import { PuppeteerPDFGenerator } from "./puppeteer.pdf-generator";
import { weeklyReportPDFTemplate } from "./templates/weekly-report.pdf-template";

export class ReportService {
  constructor(private pdfGenerator: PuppeteerPDFGenerator) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const html = dailyReportTemplate(date, totalNumber);

    const pdfBuffer = await this.pdfGenerator.generatePDF(html);

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

    const html = weeklyReportPDFTemplate(dateFrom, dateTo, totalNumber);

    const pdfBuffer = await this.pdfGenerator.generatePDF(html);

    await new Promise((resolve) =>
      writeFile("./weeklyReport.pdf", pdfBuffer, resolve)
    );
  }
}
