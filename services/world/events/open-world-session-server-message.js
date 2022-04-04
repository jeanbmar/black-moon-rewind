const { sessions } = require('../state');

module.exports = function listener(message, socket) {
  sessions.set(socket, { id: message.id });
};
