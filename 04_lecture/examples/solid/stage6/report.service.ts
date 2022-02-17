import { writeFile } from "fs";
import { DailyReportPDFTemplate } from "./templates/daily-report.pdf-template";
import { IPDFHandler } from "./i.pdf-handler";
import { WeeklyReportPDFTemplate } from "./templates/weekly-report.pdf-template";

export class ReportService {
  constructor(private pdfHandler: IPDFHandler) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new DailyReportPDFTemplate({
      date,
      totalNumber,
    });

    const pdfBuffer = await this.pdfHandler.generatePDF(template);

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

    const template = new WeeklyReportPDFTemplate({
      dateFrom,
      dateTo,
      totalNumber,
    });

    const pdfBuffer = await this.pdfHandler.generatePDF(template);

    await new Promise((resolve) =>
      writeFile("./weeklyReport.pdf", pdfBuffer, resolve)
    );
  }
}
