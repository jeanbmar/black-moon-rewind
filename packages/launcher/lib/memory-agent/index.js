const network = require('./network');
const debug = require('./debug');
const display = require('./display');
const bugFixes = require('./bug-fixes');

const init = async (stage, options = {}) => {
  const { env = {} } = options;
  console.log('process', Process.id, Process.arch, Process.platform);
  network.disableCrypto();
  network.enableTCP();
  network.disableSynAck();
  if (env.NODE_ENV !== 'production') {
    debug.hookDebugLog((message) => send({ type: 'stdout', message }));
    debug.hookPackets((buf, direction) =>
      console.log(direction === 1 ? 'S' : 'R', buf)
    );
  }
  display.upscale();
  bugFixes.fixDeleteChatterChannels();
};

rpc.exports = { init };
