const { Router } = require('@reultra/core');
const { Consumer } = require('@reultra/applications');
const { message } = require('@black-moon-rewind/middleware');
const authenticateServerVersion = require('./middleware/authenticate-server-version');
const exitGame = require('./middleware/exit-game');
const getCharacterList = require('./middleware/get-character-list');
const registerAccount = require('./middleware/register-account');

(async () => {
  const router = new Router();
  const consumer = new Consumer();

  router.use('auth.authenticateServerVersion', authenticateServerVersion);
  router.use('auth.exitGame', exitGame);
  router.use('auth.getCharacterList', getCharacterList);
  router.use('auth.registerAccount', registerAccount);

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
