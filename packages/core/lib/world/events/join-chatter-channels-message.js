const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { id } = sessions.get(socket);
  const character = characters.get(id);
  this.emit(
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
};
