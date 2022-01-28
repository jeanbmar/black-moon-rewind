const network = require('./network');
const debug = require('./debug');

const init = async () => {
    console.log('process', Process.id, Process.arch, Process.platform);
    network.disableCrypto();
    network.enableTCP();
    network.disableSynAck();
    debug.hookDebugLog((message) => send({ type: 'stdout', message }));
    debug.hookPackets((buf, direction) => console.log(direction === 1 ? 'S' : 'R', buf));
};

rpc.exports = { init };
