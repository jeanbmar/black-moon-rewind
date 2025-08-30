const { sessions } = require('../state');

module.exports = function listener({ accountId, characterId }, socket) {
  sessions.set(socket, { accountId, characterId });
};
