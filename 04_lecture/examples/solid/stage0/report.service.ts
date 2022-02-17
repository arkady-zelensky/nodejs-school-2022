import { writeFile } from "fs";
import { PuppeteerPDFGenerator } from "./puppeteer.pdf-generator";

export class ReportService {
  constructor(private pdfGenerator: PuppeteerPDFGenerator) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const pdfBuffer = await this.pdfGenerator.generateDailyReport(
      date,
      totalNumber
    );

    await new Promise((resolve) =>
      writeFile("./dailyReport.pdf", pdfBuffer, resolve)
    );
  }
}
