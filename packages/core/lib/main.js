const net = require('net');
const { BlackMoonSocket } = require('@black-moon-rewind/microservices');
const Character = require('./character');
const { TICK_RATE } = require('./constants');
const activeConnections = require('./active-connections');
const messageHandler = require('./message-handler');
const gameState = require('./game-state');

const port = 19947;
const server = new net.createServer();

const character = new Character();
character.x = 1057; // 0x28;
character.y = 973; // 0x4a;
character.z = 65; // 0x93;

gameState.character = character
setInterval(() => {
    gameState.update();
}, 1000 / TICK_RATE);

server.on('connection', (netSocket) => {
    console.log('new player connection');
    const socket = new BlackMoonSocket({ handle: netSocket._handle });
    activeConnections.add(socket);
    socket.setNoDelay(true);
    socket.setTimeout(2000);
    socket.on('error', console.log);
    socket.on('message', async (message) => console.log('received', message.constructor.name));
    socket.on('message', async (message) => {
        const handlerName = message.constructor.name;
        if (messageHandler.listenerCount(handlerName) === 0) {
            console.warn(`no handler for payload ${handlerName}`);
            return;
        }
        messageHandler.emit(handlerName, message, socket);
    });
    socket.on('close', () => {
        activeConnections.delete(socket);
        console.log('player disconnected');
    });
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});
