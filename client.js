const net = require('net');

const conn = net.createConnection({
  /** REMOTE */
  // host: '6.tcp.ngrok.io', // change to IP address of computer or ngrok host if tunneling
  // port: 19859 // or change to the ngrok port if tunneling

  /** LOCAL */
  host: '192.168.0.20',
  port: 3000
});

process.stdin.on('data', function (message) {
  conn.write(message);
});

// client.js
conn.on('data', (data) => {
  console.log('Server says: ', data);
});

conn.on('connect', () => {
  conn.write('Hello from client!');
});

conn.setEncoding('utf8'); // interpret data as text
