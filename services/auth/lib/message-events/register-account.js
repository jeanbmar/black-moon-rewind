const { AccountRegisteredMessage } = require('@black-moon-rewind/messaging');
const { accounts } = require('../state');

// todo handle wrong credentials

module.exports = async (message, ctx) => {
  const { id: accountId, password } = message;
  const account = accounts.get(accountId);
  if (account && account.password === password) {
    await ctx.handshake('auth', accountId);
    await ctx.setHeaders({ accountId });
    await ctx.send(new AccountRegisteredMessage());
  }
};
