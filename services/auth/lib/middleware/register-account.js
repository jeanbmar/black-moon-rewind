const { AccountRegisteredMessage } = require('@black-moon-rewind/messaging');
const { accounts, sessions } = require('../state');

module.exports = (session, state, push) => {
  const {
    message: { id, password },
  } = state;
  const account = accounts.get(id);
  if (account && account.password === password) {
    // todo remove this shit and bind character id in rabbitmq for further routing
    sessions.set(state.from, { id });
    // this.emit('open-world-session-server-message', { id }, socket);
    push(null, {
      ...state,
      key: state.from,
      message: new AccountRegisteredMessage(),
    });
  }
};
