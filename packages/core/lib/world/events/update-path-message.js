const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { id } = sessions.get(socket);
  const character = characters.get(id);
  character.updatePath(message.path, message.x, message.y);
};
