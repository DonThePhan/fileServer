const net = require('net');
const server = net.createServer();

const fs = require('fs');

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('connection', (client) => {
  console.log('New client connected!');
  client.write('Hello there!');

  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    data = data.replace('\n', '');
    let dataArr = data.split(' ');

    if (dataArr[0] === 'download') {
      let fileName = dataArr[1];
      fs.readFile(`./${fileName}`, `utf8`, (err, data) => {
        if (!err) {
          client.write(data);
        }
      });
    } else {
      console.log('Message from client: ', data);
    }
  });

  client.write('super specical secret message sent!');
});
