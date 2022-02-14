const { AccountRegisteredMessage } = require('@black-moon-rewind/messaging');
const { accounts, sessions } = require('../state');

module.exports = function listener({ id, password }, socket) {
  const account = accounts.get(id);
  if (account && account.password === password) {
    sessions.set(socket, { id });
    this.emit('open-world-session-server-message', { id }, socket);
    socket.send(new AccountRegisteredMessage());
  }
};
