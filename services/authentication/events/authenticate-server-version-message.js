const { ServerVersionMessage } = require('@black-moon-rewind/messaging');

module.exports = function listener(message, socket) {
  socket.send(new ServerVersionMessage());
};
