const net = require('net');
const amqp = require('amqplib');
const { KeepAliveOkMessage } = require('@black-moon-rewind/messaging');
const {
  MicroService,
  PacketPublisher,
  PacketConsumer,
  tcpGateway,
  TcpServer,
} = require('@black-moon-rewind/game-js');
const MessagingClient = require('./broker-client');
const { packetReader, packetWriter } = require('./messaging');

const { TICK_RATE } = require('./common').config;

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

(async () => {
  const client = await MicroService.connect();
  const server = new TcpServer();

  server.use(packetReader).pipe(client);
  client.use(packetWriter).pipe(server);

  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });

  // done complete message writer
  // done replace msg.properties.headers.type with msg.properties.type
  // done check absence of side effects on correlationId (done: use replyTo)
  // done destroy messages from queue after consumption
  // todo add publish and consume methods to broker client
  // done convert message ids, eg 99 -> 10099
  // todo handle socket, stream, channel errors -> wrappers?
  // todo handle disconnect sockets on demand
  // todo discard unknown messages -> inside packet reader
  // todo handle socket timeout (keep alive) -> via a MessageWriter stream?
})();

/*
messageManager.consume('x', (message, recipient) => {
  recipient.reply(message); // send to sender queue
  recipient.send(queue, message) // send to a single queue
  recipient.publish(exchange, message) // send to every queue in the exchange / room
  recipient.join(exchange); // join a room
  recipient.leave(exchange); // leave a room

  messageManager.send('user-id', message);
  messageManager.send('message-name', message);
  messageManager.publish('room-id', message); // publish sends to every queue in exchange
});
*/
