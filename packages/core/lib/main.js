// const { KeepAliveOkMessage } = require('@black-moon-rewind/messaging');
const { Exchange, TcpServer } = require('@reultra/core');
const { packet } = require('./messaging');

// const { TICK_RATE } = require('./common').config;

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
  const server = new TcpServer();
  const exchange = new Exchange();

  server.use(packet.fromBuffer()).use(exchange.publish());
  exchange.use(packet.toBuffer()).use(server.send());

  await exchange.connect();
  exchange.pair(server);

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${PORT}`);
  });

  // todo inside worker, split upstream and downstream (no more context issue afterward with incoming and outgoing var named identically) (use something like a messaging application)
  // done rename state to session
  // done 'use' keeps a reference to caller (like koa app)
  // done 'use' does try catch wrapping
  // done 'push' clones parent context so it's safe to write multiple times
  // done complete message writer
  // done replace msg.properties.headers.type with msg.properties.type
  // done check absence of side effects on correlationId (done: use replyTo)
  // done destroy messages from queue after consumption
  // done add publish and consume methods to broker client
  // done convert message ids, eg 99 -> 10099
  // todo discard unknown messages -> inside packet reader
  // todo handle socket timeout (keep alive)
  // todo implement joining and leaving queues (eg joining chatter channel)
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
