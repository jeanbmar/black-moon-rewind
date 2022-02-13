const { EnteredGameMessage } = require('@black-moon-rewind/messaging');
const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { id } = sessions.get(socket);
  const character = characters.get(id);
  const enteredGame = new EnteredGameMessage();
  enteredGame.entities = [
    {
      x: character.x,
      y: character.y,
      unit: { id: character.id },
    },
  ];
  socket.send(enteredGame);
};
