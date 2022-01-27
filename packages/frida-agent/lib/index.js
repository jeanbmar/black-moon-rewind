const network = require('./network');
const debug = require('./debug');

const init = async () => {
    console.log('process', Process.id, Process.arch, Process.platform);
    network.disableCrypto();
    network.enableTCP();
    // debug.hookDebugLog((message) => send({ type: 'stdout', message }));
    debug.hookPackets((buf) => console.log(buf));
};

rpc.exports = { init };
