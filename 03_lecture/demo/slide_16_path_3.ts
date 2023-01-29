import * as path from 'path';
import { promises as fs } from 'fs';

(async function () {
  // create directory
  await fs.mkdir(path.join(__dirname, 'test'), {});
  console.log('Folder created...');

  // Create and write to file
  await fs.writeFile(path.join(__dirname, 'test', 'textfile.txt'), 'Important file data.');
  console.log('File written to...');

  // File append
  await fs.appendFile(path.join(__dirname, 'test', 'textfile.txt'),' I love Node.js')
  console.log('File written to...');

  // Read file
  const data = await fs.readFile(path.join(__dirname, 'test', 'textfile.txt'), 'utf8');
  console.log(data);

  // Rename file
  await fs.rename(path.join(__dirname, 'test', 'textfile.txt'), path.join(__dirname, 'test', 'helloworld.txt'));
  console.log('File renamed...');

  await fs.unlink(path.join(__dirname, 'test', 'helloworld.txt'));
})();
