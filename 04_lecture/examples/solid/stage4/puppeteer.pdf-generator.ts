import { launch } from "puppeteer";
import { DailyReportPDFTemplate } from "./templates/daily-report.pdf-template";
import { WeeklyReportPDFTemplate } from "./templates/weekly-report.pdf-template";

export class PuppeteerPDFGenerator {
  public async generatePDF(
    template: DailyReportPDFTemplate | WeeklyReportPDFTemplate
  ): Promise<Buffer> {
    const browser = await launch();

    const page = await browser.newPage();

    const html = template.getHTML();

    await page.setContent(html);

    const pdfBuffer: Buffer = await page.pdf({ landscape: template.isLandscape() });
    console.log('Created buffer');

    return pdfBuffer;
  }
}
