const { Worker, TcpGateway } = require('@reultra/core');
const { workerConfig, tcpServerConfig } = require('@black-moon-rewind/core');
const timeout = require('./server-events/timeout');

const PORT = 19947;

(async () => {
  const worker = new Worker(workerConfig);
  const gateway = await new TcpGateway(worker, {
    ...tcpServerConfig,
    timeout: 2000,
  }).connect();

  gateway.on('connect', (session) => {
    session.totalSent = 0;
    session.timeoutCount = 0;
  });

  gateway.on('data', (session) => {
    session.timeoutCount = 0;
  });

  gateway.on('timeout', async (session) => {
    if (session.timeoutCount >= 3) {
      session.socket.destroy(new Error('connection timeout'));
    } else {
      worker.emit('serverEvent', 'timeout', null, session.headers);
      this.timeoutCount += 1;
    }
  });

  worker.on('timeout', timeout);

  gateway.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${PORT}`);
  });
})();
