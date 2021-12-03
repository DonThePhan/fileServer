const net = require('net');
const server = net.createServer();

const fs = require('fs');

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('connection', (client) => {
  console.log('New client connected!');

  client.setEncoding('utf8'); // interpret data as text
  client.write(`You're connected! 
  To RETRIEVE info, type "download <fileName.ext>"
  i.e. "download dune.txt"
  TRY IT!`);

  client.on('data', (data) => {
    data = data.replace('\n', '');
    const dataArr = data.split(' ');

    // CASE A) Client RETRIEVING data
    if (dataArr[0] === 'download') {
      let fileName = dataArr[1];

      // look up requested file & try to send to client
      fs.readFile(`./${fileName}`, `utf8`, (err, fileData) => {
        if (!err) {
          client.write(fileData);
          console.log(`Client requested & RECEIVED data from ${fileName}`);
        } else {
          client.write(`File not Found`);
          console.log(`Client requested & FAILED to receive data from ${fileName}`);
        }
      });
      // CASE B) Client passing a REGULAR message
    } else {
      console.log('Message from client: ', data);
    }
  });
});
