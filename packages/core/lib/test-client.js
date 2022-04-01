const { Exchange, Router } = require('@reultra/core');
const { message } = require('./messaging');

(async () => {
  const router = new Router();
  const exchange = new Exchange();

  exchange
    .use(message.fromPacket())
    .use(router.middleware())
    .use(message.toPacket())
    .use(exchange.publish());

  router.use('/authenticate-server-version', async () => {
    console.log('authenticating!');
  });
  await exchange.connect();
  await exchange.subscribe('auth.messages.*');
  await exchange.subscribe('service.messages.*');
})();
