const { Exchange, Router } = require('@reultra/core');
const { message } = require('./messaging');

(async () => {
  const router = new Router();
  const exchange = new Exchange();

  exchange
    .use(message.decode())
    .use(router.middleware())
    .use(message.encode())
    .use(exchange.publish());

  router.use('/authenticate-server-version', async () => {
    console.log('authenticating!');
  });
  await exchange.connect();
  router.routes().forEach((route) => exchange.subscribe(route));
})();
