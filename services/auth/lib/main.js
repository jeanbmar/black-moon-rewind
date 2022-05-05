const { Worker } = require('@reultra/core');
const { workerConfig } = require('@black-moon-rewind/core');
const authenticateServerVersion = require('./middleware/authenticate-server-version');
const exitGame = require('./middleware/exit-game');
const getCharacterList = require('./middleware/get-character-list');
const registerAccount = require('./middleware/register-account');

(async () => {
  const worker = await new Worker(workerConfig).connect('auth');
  worker.on('registerAccount', registerAccount);
  worker.on('authenticateServerVersion', authenticateServerVersion);
  worker.on('exitGame', exitGame);
  worker.on('getCharacterList', getCharacterList);
})();
