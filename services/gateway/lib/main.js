// const { KeepAliveOkMessage } = require('@black-moon-rewind/messaging');
const { MessageManager, TcpGateway } = require('@reultra/core');
const { amqpConfig, tcpConfig } = require('@black-moon-rewind/core');

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
  const gateway = new TcpGateway({ ...tcpConfig });
  await gateway.connect();

  gateway.on('connect', (session) => {
    session.totalSent = 0;
  });

  const messageManager = new MessageManager({ ...amqpConfig });
  await messageManager.connect();
  await messageManager.subscribe(gateway.uid, '');
  messageManager.on('setAccountHeader', (message) => {
    console.log('setAccountHeader!', message);
  });
  messageManager.on('logicError', (...args) => {
    console.log('logicError', ...args);
  });

  gateway.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${PORT}`);
  });

  // done implement joining and leaving queues (eg joining chatter channel) -> done by separating consume from subscribe. use bindQueue.
  // done implement methods on exchange session to publish / send
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
  // todo wrap deserialize in try catch block + emit error in catch
  // todo discard unknown messages -> inside packet reader
  // todo handle socket timeout (keep alive)
})();
