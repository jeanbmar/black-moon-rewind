const net = require('net');
const {
    AccountRegistered,
    ServerVersion,
    CharacterList,
    CharacterData,
    EnteredGame,
    SpellList,
    EquipmentData,
    KeepAliveOk,
} = require('@black-moon-rewind/messaging');
const { BlackMoonSocket } = require('@black-moon-rewind/microservices');
const Character = require('./character');
const activeConnections = require('./active-connections');

const messageHandlers = new Map();
const port = 19947;
const server = new net.createServer();

const character = new Character();
character.x = 0x34;
character.y = 0x4a;
character.z = 0x93;

server.on('connection', function(netSocket) {
    console.log('new player connection');
    const socket = new BlackMoonSocket({ handle: netSocket._handle });
    activeConnections.add(socket);
    const timeout = setInterval(() => character.tick(), 60);
    socket.setNoDelay(true);
    socket.setTimeout(2000);
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
    socket.on('close', () => {
        clearInterval(timeout);
        activeConnections.delete(socket);
        console.log('player disconnected');
    });
});

messageHandlers.set('RegisterAccount', (message, socket) => {
    socket.send(new AccountRegistered());
});
messageHandlers.set('AuthenticateServerVersion', (message, socket) => {
    socket.send(new ServerVersion());
});
messageHandlers.set('GetCharacterList', (message, socket) => {
    const characterList = new CharacterList();
    characterList.characters = [{ name: character.name, level: 3 }];
    socket.send(characterList);
});
messageHandlers.set('LoadCharacter', (message, socket) => {
    const characterData = new CharacterData();
    characterData.id = character.id;
    characterData.x = character.x;
    characterData.y = character.y;
    characterData.z = character.z;
    characterData.items = [
        { id: 0x0017EBF, slot: 0xFF },
        { id: 0x0003110A, slot: 0 },
        { id: 0x000216E8, slot: 1 },
    ]
    socket.send(characterData);
});
messageHandlers.set('EnterGame', (message, socket) => {
    const enteredGame = new EnteredGame();
    enteredGame.entities = [{
        x: character.x,
        y: character.y,
        unit: { id: character.id },
    }];
    socket.send(enteredGame);
});
messageHandlers.set('JoinChatterChannels', (message) => {
    console.log(`user requested to join channels ${JSON.stringify(message.chatterChannels)}`);
});
messageHandlers.set('GetSpellList', (message, socket) => {
    const spellList = new SpellList();
    // spellList.spells = [];
    socket.send(spellList);
});
messageHandlers.set('ViewEquipped', (message, socket) => {
    const equipmentData = new EquipmentData();
    equipmentData.items[1] = {
        id: 0x00100092,
        b: 0x00017EBF,
        c: -1,
        d: 0x0001,
        e: 0x4F41,
        f: 0x00001B89,
        g: 0x00001B8A,
    };
    equipmentData.items[2] = {
        id: 0x00100093,
        b: 0x0003110A,
        c: 0,
        d: 0x0001,
        e: 0x5100,
        f: 0x0000C70E,
        g: 0x0000C70F,
    };
    equipmentData.items[3] = {
        id: 0x00100094,
        b: 0x000216E8,
        c: 1,
        d: 0x0001,
        e: 0x6927,
        f: 0x0000240A,
        g: 0x0000240B,
    };
    socket.send(equipmentData);
});
messageHandlers.set('MoveTop', (message) => {
    character.move(1, message.distance);
});
messageHandlers.set('MoveTopRight', (message) => {
    character.move(2, message.distance);
});
messageHandlers.set('MoveRight', (message) => {
    character.move(3, message.distance);
});
messageHandlers.set('MoveBottomRight', (message) => {
    character.move(4, message.distance);
});
messageHandlers.set('MoveBottom', (message) => {
    character.move(5, message.distance);
});
messageHandlers.set('MoveBottomLeft', (message) => {
    character.move(6, message.distance);
});
messageHandlers.set('MoveLeft', (message) => {
    character.move(7, message.distance);
});
messageHandlers.set('MoveTopLeft', (message) => {
    character.move(8, message.distance);
});
messageHandlers.set('KeepAliveOk', () => {});
messageHandlers.set('Unknown', (message, socket) => {
    console.log(`unknown payload ${JSON.stringify(message)}`);
    socket.send(new KeepAliveOk());
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});
