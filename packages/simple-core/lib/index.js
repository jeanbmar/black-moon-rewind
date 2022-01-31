const net = require('net');
const {
    AccountRegistered,
    ServerVersion,
    CharacterList,
    CharacterData,
    EnteredGame,
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
    const characterData = new CharacterData();
    characterData.items = [
        { id: 0x0017EBF, slot: 0xFF },
        { id: 0x0003110A, slot: 0 },
        { id: 0x000216E8, slot: 1 },
    ]
    socket.sendMessage(new CharacterData());
});
messageHandlers.set('EnterGame', (message, socket) => {
    socket.sendMessage(new EnteredGame());
});
messageHandlers.set('Unknown', (message) => {
    console.log(`unknown payload ${JSON.stringify(message)}`);
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});
