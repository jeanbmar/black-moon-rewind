const { EventEmitter } = require('events');
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
const { PATH_BEAT } = require('./constants');

const gameState = require('./game-state');

const events = new EventEmitter();

events.on('RegisterAccount', (message, socket) => {
    socket.send(new AccountRegistered());
});
events.on('AuthenticateServerVersion', (message, socket) => {
    socket.send(new ServerVersion());
});
events.on('GetCharacterList', (message, socket) => {
    const characterList = new CharacterList();
    characterList.characters = [{ name: gameState.character.name, level: 3 }];
    socket.send(characterList);
});
events.on('LoadCharacter', (message, socket) => {
    const characterData = new CharacterData();
    characterData.id = gameState.character.id;
    characterData.x = gameState.character.x;
    characterData.y = gameState.character.y;
    characterData.z = gameState.character.z;
    characterData.items = [
        { id: 0x0017EBF, slot: 0xFF },
        { id: 0x0003110A, slot: 0 },
        { id: 0x000216E8, slot: 1 },
    ];
    characterData.pathBeat = PATH_BEAT;
    socket.send(characterData);
});
events.on('EnterGame', (message, socket) => {
    const enteredGame = new EnteredGame();
    enteredGame.entities = [{
        x: gameState.character.x,
        y: gameState.character.y,
        unit: { id: gameState.character.id },
    }];
    socket.send(enteredGame);
});
events.on('JoinChatterChannels', (message) => {
    console.log(`user requested to join channels ${JSON.stringify(message.chatterChannels)}`);
});
events.on('GetSpellList', (message, socket) => {
    const spellList = new SpellList();
    // spellList.spells = [];
    socket.send(spellList);
});
events.on('ViewEquipped', (message, socket) => {
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
events.on('UpdatePath', (message) => {
    gameState.character.updatePath(message.path, message.x, message.y);
});
events.on('StopPath', () => {
    gameState.character.stopPath();
});
events.on('MoveTop', (message) => {
    gameState.character.addMove(1, message.distance);
});
events.on('MoveTopRight', (message) => {
    gameState.character.addMove(2, message.distance);
});
events.on('MoveRight', (message) => {
    gameState.character.addMove(3, message.distance);
});
events.on('MoveBottomRight', (message) => {
    gameState.character.addMove(4, message.distance);
});
events.on('MoveBottom', (message) => {
    gameState.character.addMove(5, message.distance);
});
events.on('MoveBottomLeft', (message) => {
    gameState.character.addMove(6, message.distance);
});
events.on('MoveLeft', (message) => {
    gameState.character.addMove(7, message.distance);
});
events.on('MoveTopLeft', (message) => {
    gameState.character.addMove(8, message.distance);
});
events.on('KeepAliveOk', () => {});
events.on('Unknown', (message, socket) => {
    console.log(`unknown payload ${JSON.stringify(message)}`);
    socket.send(new KeepAliveOk());
});

module.exports = events;
