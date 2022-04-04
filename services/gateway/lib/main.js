// const { KeepAliveOkMessage } = require('@black-moon-rewind/messaging');
const { Consumer, TcpServer } = require('@reultra/applications');
const { packet } = require('@black-moon-rewind/middleware');

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
  const consumer = new Consumer();

  server
    .use(packet.fromBuffer())
    .use((session, state, push) => {
      push(null, { ...state, from: session.id, exchange: 'root' });
    })
    .use(consumer.publish());

  consumer
    .use(packet.toBuffer())
    .use(async (session, state, push) => {
      push(null, { ...state, id: state.key });
    })
    .use(server.send());

  server.on('connect', async (session) => {
    await consumer.assertQueue(session.id, {
      durable: false,
      autoDelete: true,
    });
    await consumer.consume(session.id);
  });
  server.on('disconnect', async (session) => {
    await consumer.cancel(session.id);
  });

  await consumer.connect();

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${PORT}`);
  });

  // done implement joining and leaving queues (eg joining chatter channel) -> done by separating consume from subscribe. use bindQueue.
  // todo implement methods on exchange session to publish / send
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
})();
