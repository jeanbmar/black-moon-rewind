const { Worker } = require('@reultra/core');
const { workerConfig } = require('@black-moon-rewind/core');
const authenticateServerVersion = require('./message-events/authenticate-server-version');
const exitGame = require('./message-events/exit-game');
const getCharacterList = require('./message-events/get-character-list');
const registerAccount = require('./message-events/register-account');

(async () => {
  const worker = await new Worker(workerConfig).connect('auth');
  worker.on('registerAccount', registerAccount);
  worker.on('authenticateServerVersion', authenticateServerVersion);
  worker.on('exitGame', exitGame);
  worker.on('getCharacterList', getCharacterList);
})();
