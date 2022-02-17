import { writeFile } from "fs";
import { launch } from "puppeteer";
import { dailyReportTemplate } from "./daily-report.pdf-template";

export class ReportService {
  constructor() {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const browser = await launch();

    const page = await browser.newPage();

    const html = dailyReportTemplate(date, totalNumber);

    await page.setContent(html);

    const pdfBuffer: Buffer = await page.pdf();

    await new Promise((resolve) =>
      writeFile("./daily.report.pdf", pdfBuffer, resolve)
    );
  }
}
