const amqp = require('amqplib');
const { BlackMoonSocket } = require('@black-moon-rewind/microservices');
const kebabCase = require('lodash.kebabcase');
const { KeepAliveOkMessage } = require('@black-moon-rewind/messaging');
const Server = require('./server');
const { Worker } = require('./worker');

const { TICK_RATE } = require('./shared').config;

/*
events.on('keep-alive-ok-message', () => {});
events.on('unknown-message', (message, socket) => {
  console.log(`unknown payload ${JSON.stringify(message)}`);
  socket.send(new KeepAliveOkMessage());
});
setInterval(() => {
  events.emit('update-world-server-message');
}, 1000 / TICK_RATE);
*/

// todo change to gateway
// a gateway is both a server and an amqp client

const PORT = 19947;
const AMQP_URL = 'amqp://localhost';
const REQUEST_EXCHANGE = 'requests';
const RESPONSE_EXCHANGE = 'responses';
const GATEWAY_ID = 'gateway-1'; // todo use uuid

(async () => {
  const client = await amqp.connect(AMQP_URL, { userId: GATEWAY_ID });
  const channel = await client.createChannel();

  const server = new Server({ transport: BlackMoonSocket });

  server.on('receive-from', async ({ header, payload }, socketId) => {
    await channel.assertExchange(REQUEST_EXCHANGE, 'direct', {
      durable: false,
    });
    channel.publish(REQUEST_EXCHANGE, `${header.type}`, payload, {
      headers: { clientId: `${GATEWAY_ID}.${socketId}` },
    });
  });

  await channel.assertExchange(RESPONSE_EXCHANGE, 'topic', {
    durable: false,
  });
  const { queue } = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(queue, RESPONSE_EXCHANGE, `${GATEWAY_ID}.*`);
  await channel.consume(
    queue,
    (msg) => {
      server.sendTo(msg.content, msg.properties.headers.clientId);
    },
    { noAck: true }
  );

  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
})();
