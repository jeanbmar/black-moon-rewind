const { EventEmitter } = require('events');
const {
  AccountRegisteredMessage,
  ServerVersionMessage,
  CharacterListMessage,
  CharacterDataMessage,
  EnteredGameMessage,
  SpellListMessage,
  EquipmentDataMessage,
  KeepAliveOkMessage,
  GameExitedMessage,
} = require('@black-moon-rewind/messaging');
const { PATH_BEAT } = require('./constants');
const gameState = require('./game-state');
const { events: chatEvents } = require('./chatter-channels');

const events = new EventEmitter();
// use chat events
chatEvents.eventNames().forEach((eventName) => {
  chatEvents.listeners(eventName).forEach((listener) => {
    events.on(eventName, listener);
  });
});

events.on('register-account-message', (message, socket) => {
  socket.send(new AccountRegisteredMessage());
});
events.on('authenticate-server-version-message', (message, socket) => {
  socket.send(new ServerVersionMessage());
});
events.on('get-character-list-message', (message, socket) => {
  const characterList = new CharacterListMessage();
  characterList.characters = [{ name: gameState.character.name, level: 3 }];
  socket.send(characterList);
});
events.on('load-character-message', (message, socket) => {
  const characterData = new CharacterDataMessage();
  characterData.id = gameState.character.id;
  characterData.x = gameState.character.x;
  characterData.y = gameState.character.y;
  characterData.z = gameState.character.z;
  characterData.items = [
    { id: 0x0017ebf, slot: 0xff },
    { id: 0x0003110a, slot: 0 },
    { id: 0x000216e8, slot: 1 },
  ];
  characterData.pathBeat = PATH_BEAT;
  socket.send(characterData);
});
events.on('enter-game-message', (message, socket) => {
  const enteredGame = new EnteredGameMessage();
  enteredGame.entities = [
    {
      x: gameState.character.x,
      y: gameState.character.y,
      unit: { id: gameState.character.id },
    },
  ];
  socket.send(enteredGame);
});
events.on('join-chatter-channels-message', (message, socket) => {
  const { character } = gameState;
  events.emit(
    'join-chatter-channels-server-message',
    {
      channels: message.channels,
      character: {
        id: character.id,
        name: character.name,
      },
    },
    socket
  );
});
events.on('chatter-channel-joined-server-command', (message) => {
  const { character } = gameState;
  const currentIndex = character.chatterChannels.findIndex(
    ({ id }) => message.channel.id === id
  );
  if (currentIndex === -1) {
    character.chatterChannels.push({ id: message.channel.id });
  }
});
events.on(
  'get-chatter-channel-list-server-command',
  function listener(message, socket) {
    const { character } = gameState;
    this.emit(
      'get-chatter-channel-list-server-message',
      {
        channels: character.chatterChannels,
        character: { id: character.id },
      },
      socket
    );
  }
);
events.on('chatter-channel-left-server-command', (message) => {
  const { character } = gameState;
  const currentIndex = character.chatterChannels.findIndex(
    ({ id }) => message.channel.id === id
  );
  if (currentIndex > -1) {
    character.chatterChannels.splice(currentIndex, 1);
  }
});
events.on('remove-from-chatter-channels-message', (message, socket) => {
  const { character } = gameState;
  events.emit(
    'remove-from-chatter-channels-server-message',
    {
      channel: { name: message.name },
      character: { id: character.id },
    },
    socket
  );
});
events.on(
  'get-chatter-channel-list-message',
  function listener(message, socket) {
    const { character } = gameState;
    this.emit(
      'get-chatter-channel-list-server-message',
      {
        channels: character.chatterChannels,
        character: { id: character.id },
      },
      socket
    );
  }
);
events.on('get-spell-list-message', (message, socket) => {
  const spellList = new SpellListMessage();
  // spellList.spells = [];
  socket.send(spellList);
});
events.on('view-equipped-message', (message, socket) => {
  const equipmentData = new EquipmentDataMessage();
  equipmentData.items[1] = {
    id: 0x00100092,
    b: 0x00017ebf,
    c: -1,
    d: 0x0001,
    e: 0x4f41,
    f: 0x00001b89,
    g: 0x00001b8a,
  };
  equipmentData.items[2] = {
    id: 0x00100093,
    b: 0x0003110a,
    c: 0,
    d: 0x0001,
    e: 0x5100,
    f: 0x0000c70e,
    g: 0x0000c70f,
  };
  equipmentData.items[3] = {
    id: 0x00100094,
    b: 0x000216e8,
    c: 1,
    d: 0x0001,
    e: 0x6927,
    f: 0x0000240a,
    g: 0x0000240b,
  };
  socket.send(equipmentData);
});
events.on('update-path-message', (message) => {
  gameState.character.updatePath(message.path, message.x, message.y);
});
events.on('stop-path-message', () => {
  gameState.character.stopPath();
});
events.on('move-top-message', (message) => {
  gameState.character.addMove(1, message.distance);
});
events.on('move-top-right-message', (message) => {
  gameState.character.addMove(2, message.distance);
});
events.on('move-right-message', (message) => {
  gameState.character.addMove(3, message.distance);
});
events.on('move-bottom-right-message', (message) => {
  gameState.character.addMove(4, message.distance);
});
events.on('move-bottom-message', (message) => {
  gameState.character.addMove(5, message.distance);
});
events.on('move-bottom-left-message', (message) => {
  gameState.character.addMove(6, message.distance);
});
events.on('move-left-message', (message) => {
  gameState.character.addMove(7, message.distance);
});
events.on('move-top-left-message', (message) => {
  gameState.character.addMove(8, message.distance);
});
events.on('keep-alive-ok-message', () => {});
events.on('exit-game-message', (message, socket) => {
  socket.send(new GameExitedMessage());
});
events.on('unknown-message', (message, socket) => {
  console.log(`unknown payload ${JSON.stringify(message)}`);
  socket.send(new KeepAliveOkMessage());
});

module.exports = events;
