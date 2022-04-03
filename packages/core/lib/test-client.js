const { Router } = require('@reultra/core');
const { Consumer } = require('@reultra/applications');
const { message } = require('./messaging');

(async () => {
  const router = new Router();
  const consumer = new Consumer();

  router.use('auth.registerAccount', async (session, state) => {
    console.log('registerAccount!', state.message);
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
