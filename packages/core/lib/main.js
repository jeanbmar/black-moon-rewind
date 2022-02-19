const net = require('net');
const amqp = require('amqplib');
const { BlackMoonSocket } = require('@black-moon-rewind/microservices');
const kebabCase = require('lodash.kebabcase');
const { KeepAliveOkMessage } = require('@black-moon-rewind/messaging');
const BrokerClient = require('./broker-client');
const MessageReader = require('./message-reader');
const MessageWriter = require('./message-writer');

const { TICK_RATE } = require('./shared').config;

/*
events.on('keep-alive-ok-message', () => {});
events.on('unknown-message', (message, socket) => {
  console.log(`unknown payload ${JSON.stringify(message)}`);
  socket.send(new KeepAliveOkMessage());
});
setInterval(() => {
  events.emit('update-world-server-message');
}, 1000 / TICK_RATE);
*/

const PORT = 19947;
const AMQP_URL = 'amqp://localhost';

(async () => {
  const server = net.createServer();
  const client = new BrokerClient({ prefix: 'gateway' });
  await client.connect(AMQP_URL);
  server.on('connection', (socket) => {
    socket
      .pipe(new MessageReader())
      .pipe(client.createStream())
      .pipe(new MessageWriter())
      .pipe(socket);
  });
  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
})();
