const { Router } = require('@reultra/core');
const { Consumer } = require('@reultra/applications');
const { message } = require('./messaging');

(async () => {
  const router = new Router();
  const consumer = new Consumer();

  router.use('auth.authenticateServerVersion', async (session, state) => {
    console.log('authenticating!', state.message);
  });

  consumer
    .use(message.fromPacket())
    .use(router.middleware())
    .use(message.toPacket())
    .use(consumer.publish());

  await consumer.connect();
  await consumer.assertExchange('root', 'topic', { durable: false });
  const { queue: authQueue } = await consumer.assertQueue('', { durable: false });
  await consumer.bindQueue(authQueue, 'root', 'auth.*');
  await consumer.consume(authQueue);
})();
