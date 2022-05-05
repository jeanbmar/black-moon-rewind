const { Worker, TcpGateway } = require('@reultra/core');
const { workerConfig, tcpServerConfig } = require('@black-moon-rewind/core');

// const { TICK_RATE } = require('./common').config;

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

const PORT = 19947;

(async () => {
  const worker = new Worker(workerConfig);
  const gateway = await new TcpGateway(worker, tcpServerConfig).connect();

  gateway.on('connect', (session) => {
    session.totalSent = 0;
  });

  gateway.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${PORT}`);
  });

  // todo handle socket timeout (keep alive)
})();
