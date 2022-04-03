const { Router } = require('@reultra/core');
const { BrokerClient } = require('@reultra/applications');
const { message } = require('./messaging');

(async () => {
  const router = new Router();
  const broker = new BrokerClient();

  // consumer.session.publish = publisher.publish;
  broker
    .use(message.fromPacket())
    .use(router.middleware())
    .use(message.toPacket())
    .use(broker.publish());

  router.use('authenticateServerVersion', async () => {
    console.log('authenticating!');
  });
  await broker.connect();
  await broker.assertExchange('root', 'topic', { durable: false });
  const { queue: authQueue } = await broker.assertQueue('', { durable: false });
  await broker.bindQueue(authQueue, 'root', 'auth.*');
  await broker.consume(authQueue);
})();
