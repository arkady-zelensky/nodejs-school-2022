import * as fs from 'fs';
import axios from 'axios';
import * as util from 'util';
import { ISender } from "./i.sender";

const stat = util.promisify(fs.stat);

export class GDriveSender implements ISender {
  public async sendFile(filePath: string): Promise<void> {
    const readStream = fs.createReadStream(filePath);
    const { size } = await stat(filePath);

    try {
      await axios({
        method: 'POST',
        url: 'https://google-drive.com/api/reports',
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Length': size,
          'Authorization': 'secret token'
        },
        data: readStream
      });
      console.log('File sent');
    } catch (e) {
      console.log('File was not sent');
    }
  }
}
