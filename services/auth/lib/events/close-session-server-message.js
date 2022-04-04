const { sessions } = require('../state');

module.exports = function listener(socket) {
  console.log('player disconnected');
  sessions.delete(socket);
};
