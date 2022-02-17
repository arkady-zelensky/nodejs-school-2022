import { writeFile } from "fs";
import { DailyReportPDFTemplate } from "./templates/daily-report.pdf-template";
import { ISender } from "./senders/i.sender";
import { WeeklyReportPDFTemplate } from "./templates/weekly-report.pdf-template";
import { IPDFGenerator } from "./pdf-generators/i.pdf-generator";

export class ReportService {
  constructor(
    private pdfGenerator: IPDFGenerator,
    private sender: ISender
  ) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new DailyReportPDFTemplate({
      date,
      totalNumber,
    });

    const pdfBuffer = await this.pdfGenerator.generatePDF(template);

    await new Promise((resolve) =>
      writeFile("./dailyReport.pdf", pdfBuffer, resolve)
    );

    await this.sender.sendFile('./dailyReport.pdf');
  }

  public async createWeeklyReport(
    dateFrom: Date,
    dateTo: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new WeeklyReportPDFTemplate({
      dateFrom,
      dateTo,
      totalNumber,
    });

    const pdfBuffer = await this.pdfGenerator.generatePDF(template);

    await new Promise((resolve) =>
      writeFile("./weeklyReport.pdf", pdfBuffer, resolve)
    );

    await this.sender.sendFile("./weeklyReport.pdf");
  }
}
