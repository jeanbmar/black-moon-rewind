const net = require('net');
const {
    AccountRegistered,
    ServerVersion,
    CharacterList,
    CharacterData,
} = require('@black-moon-rewind/messaging');
const { BlackMoonSocket } = require('@black-moon-rewind/microservices');

const messageHandlers = new Map();
const port = 19947;
const server = new net.createServer();

server.on('connection', function(netSocket) {
    console.log('new player connected');
    const socket = new BlackMoonSocket(netSocket);
    socket.on('error', console.log);
    socket.on('message', async (message) => console.log('received', message.constructor.name));
    socket.on('message', async (message) => {
        const handlerName = message.constructor.name;
        const handler = messageHandlers.get(handlerName);
        if (!handler) {
            console.warn(`no handler for payload ${handlerName}`);
            return;
        }
        await handler(message, socket);
    });
});

messageHandlers.set('RegisterAccount', (message, socket) => {
    socket.sendMessage(new AccountRegistered());
});
messageHandlers.set('AuthenticateServerVersion', (message, socket) => {
    socket.sendMessage(new ServerVersion());
});
messageHandlers.set('GetCharacterList', (message, socket) => {
    const characterList = new CharacterList();
    characterList.characters = [{ name: 'Ultrapowa', level: 3 }];
    socket.sendMessage(characterList);
});
messageHandlers.set('LoadCharacter', (message, socket) => {
    socket.sendMessage(new CharacterData());
});
messageHandlers.set('Unknown', (message) => {
    console.log(`unknown payload ${JSON.stringify(message)}`);
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});
