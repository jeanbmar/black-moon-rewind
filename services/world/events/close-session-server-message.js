const { sessions } = require('../state');

module.exports = function listener(socket) {
  sessions.delete(socket);
};
