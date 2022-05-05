const { Worker } = require('@reultra/core');
const { workerConfig } = require('@black-moon-rewind/core');
const authenticateServerVersion = require('./middleware/authenticate-server-version');
const exitGame = require('./middleware/exit-game');
const getCharacterList = require('./middleware/get-character-list');
const registerAccount = require('./middleware/register-account');

(async () => {
  const worker = await new Worker(workerConfig).connect('auth');
  worker.on('registerAccount', registerAccount);

  // worker.on('message.authenticateServerVersion', authenticateServerVersion);
  // worker.on('message.exitGame', exitGame);
  // worker.on('message.getCharacterList', getCharacterList);
  // worker.on('message.registerAccount', registerAccount);

  /*
  messageManager.on('service.disconnect', (message) => {
    console.log('disconnect!', message);
  });
  */

  /*
  await broker.assertExchange('service', 'topic', { durable: false });
  const { queue: service } = await broker.assertQueue('', { durable: false });
  await broker.bindQueue(service, 'service', 'service.*');
  await messageManager.subscribe(service, { noAck: true });
   */
})();
