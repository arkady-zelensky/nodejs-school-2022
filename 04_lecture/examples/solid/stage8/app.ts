import { ReportService } from "./report.service";
import { PuppeteerPDFGenerator } from "./pdf-generators/puppeteer.pdf-generator";
import { GDriveSender } from "./senders/gdrive.sender";

async function main() {
  const pdfGenerator = new PuppeteerPDFGenerator();
  const gDriveSender = new GDriveSender();
  const service = new ReportService(pdfGenerator, gDriveSender);

  await service.createDailyReport(new Date(2021, 10, 5), 3);
  await service.createWeeklyReport(new Date(2021, 10, 5), new Date(), 3);
}

main().then(() => process.exit(0)).catch(console.log);
