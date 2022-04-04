const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { characterId } = sessions.get(socket);
  const character = characters.get(characterId);
  character.addMove(3, message.distance);
};
