import { launch } from "puppeteer";
import * as fs from 'fs';
import axios from 'axios';
import * as util from 'util';
import { AbstractPDFTemplate } from "./templates/abstract.pdf-template";
import { IPDFHandler } from "./i.pdf-handler";

const stat = util.promisify(fs.stat);

export class PuppeteerPDFGenerator implements IPDFHandler {
  public async generatePDF<TPayload>(
    template: AbstractPDFTemplate<TPayload>
  ): Promise<Buffer> {
    const browser = await launch();

    const page = await browser.newPage();

    const html = template.getHTML();

    await page.setContent(html);

    const pdfBuffer: Buffer = await page.pdf({
      landscape: template.isLandscape(),
    });
    console.log('Created buffer');

    return pdfBuffer;
  }

  public async sendPDF(filePath: string): Promise<void> {
    const readStream = fs.createReadStream(filePath);
    const { size } = await stat(filePath);

    await axios({
      method: 'POST',
      url: 'https://google-drive.com/api/reports',
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': size,
        'Authorization': 'secret token'
      },
      data: readStream
    })
  }
}
