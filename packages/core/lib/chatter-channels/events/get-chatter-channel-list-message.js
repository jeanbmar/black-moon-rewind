const { sessions } = require('../state');

module.exports = function listener(message, socket) {
  const { characterId } = sessions.get(socket);
  this.emit('get-chatter-channel-list-server-message', { characterId }, socket);
};
