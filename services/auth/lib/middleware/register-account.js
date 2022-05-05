const { AccountRegisteredMessage } = require('@black-moon-rewind/messaging');
const { accounts } = require('../state');

// todo handle wrong credentials

module.exports = async function registerAccount(message, ctx) {
  const { id, password } = message;
  const account = accounts.get(id);
  if (account && account.password === password) {
    await ctx.handshake('auth', id);
    await ctx.setHeaders({ accountId: id });
    await ctx.send(new AccountRegisteredMessage());
  }
};
