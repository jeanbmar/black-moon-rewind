const net = require('net');
const amqp = require('amqplib');
const { KeepAliveOkMessage } = require('@black-moon-rewind/messaging');
const {
  PacketPublisher,
  PacketConsumer,
} = require('@black-moon-rewind/game-js');
const MessagingClient = require('./broker-client');
const { PacketReader, PacketWriter } = require('./messaging');

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
const AMQP_URL = 'amqp://localhost';

/*
(async () => {
  // const { channel } = await MessagingClient.connect(AMQP_URL);
  // todo add uid as default middleware
  gateway.in(() => new PacketReader());
  // game.use(() => new PacketPublisher(channel));
  // game.use(() => new PacketConsumer(channel, replyTo));
  gateway.out(() => new PacketWriter());
  gateway.connect(AMQP_URL);
  gateway.listen(PORT);
})();
*/

(async () => {
  const server = net.createServer();
  const broker = new MessagingClient({ prefix: 'gateway' });
  const channel = await broker.connect(AMQP_URL);
  server.on('connection', (socket) => {
    const me = broker.nextUid();
    socket
      .pipe(new PacketReader())
      .pipe(new PacketPublisher(channel, { clientId: me }));
    new PacketConsumer(channel).pipe(new PacketWriter()).pipe(socket);

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
  });
  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
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
messageManager.consume('y', () => {});
const messageStream = messageManager.createStream();
messageStream
  .pipe(new MessageReader())
  .pipe(messageManager)
  .pipe(new MessageWriter())
  .pipe(messageStream);



new PacketConsumer(channel, 'y')
  .pipe(new MessageReader())
  .on('data', (message) => {

  });

messageManager.consume('x', (req, client) => {
});
*/
