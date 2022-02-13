const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { id } = sessions.get(socket);
  const character = characters.get(id);
  this.emit(
    'remove-from-chatter-channels-server-message',
    {
      channel: { name: message.name },
      character: { id: character.id },
    },
    socket
  );
};
