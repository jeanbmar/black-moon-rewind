const { AccountRegisteredMessage } = require('@black-moon-rewind/messaging');
const { accounts, sessions } = require('../state');

module.exports = function listener({ accountName: id, password }, socket) {
  const account = accounts.get(id);
  if (account && account.password === password) {
    sessions.set(socket, {
      id,
      send: (message) => socket.send(message),
    });
    this.emit('open-world-session-server-message', { id }, socket);
    socket.send(new AccountRegisteredMessage());
  }
};
