const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { id } = sessions.get(socket);
  const character = characters.get(id);
  this.emit(
    'get-chatter-channel-list-server-message',
    {
      channels: character.chatterChannels,
      character: { id: character.id },
    },
    socket
  );
};
