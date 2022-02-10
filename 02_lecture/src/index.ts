import * as http from "http";
import * as url from "url";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  let msg = '';
  switch (query?.move) {
    case '<':
      msg = `Iam going left`;
      break;
    case '>':
      msg = `Im going right`;
      break;
    default:
      msg = `I don't know such path`;
  }
  if (!query?.move) {
    msg = `Let's go somewhere`;
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(msg);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
