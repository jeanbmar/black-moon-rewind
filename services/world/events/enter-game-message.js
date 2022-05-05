const { EnteredGameMessage } = require('@black-moon-rewind/messaging');
const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { characterId } = sessions.get(socket);
  const character = characters.get(characterId);
  const enteredGame = new EnteredGameMessage();
  enteredGame.entities = [
    {
      x: character.x,
      y: character.y,
      unit: { id: character.unitId },
    },
  ];
  socket.send(enteredGame);
};
