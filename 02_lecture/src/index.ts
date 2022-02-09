import * as http from "http";
import * as url from "url";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  let msg = 'Hello World!';
  switch (query?.move) {
    case '<':
      msg = 'left';
      break;
    case '>':
      msg = 'right';
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(msg);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
