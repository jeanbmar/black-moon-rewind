const { Router } = require('@reultra/core');
const { Consumer } = require('@reultra/applications');
const { AccountRegisteredMessage } = require('@black-moon-rewind/messaging');
const { message } = require('@black-moon-rewind/middleware');

(async () => {
  const router = new Router();
  const consumer = new Consumer();

  router.use('auth.registerAccount', async (session, state, push) => {
    push(null, {
      ...state,
      key: state.from,
      exchange: '',
      message: new AccountRegisteredMessage(),
    });
  });
  router.use(async (session, state) => {
    console.log(`skipping ${state.packet.type}`);
  });

  consumer
    .use(message.fromPacket())
    .use(router.middleware())
    .use(message.toPacket())
    .use(consumer.publish());

  await consumer.connect();
  await consumer.assertExchange('root', 'topic', { durable: false });
  const { queue } = await consumer.assertQueue('', { durable: false });
  await consumer.bindQueue(queue, 'root', 'auth.*');
  await consumer.consume(queue);
})();
