import { launch } from "puppeteer";
import { dailyReportTemplate } from "./daily-report.pdf-template";

export class PuppeteerPDFGenerator {
  public async generateDailyReport(date: Date, totalNumber: number): Promise<Buffer> {
    const browser = await launch();

    const page = await browser.newPage();

    const html = dailyReportTemplate(date, totalNumber);

    await page.setContent(html);

    const pdfBuffer: Buffer = await page.pdf();
    console.log('Created buffer');

    return pdfBuffer;
  }
}
