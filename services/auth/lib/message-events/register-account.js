const { AccountRegisteredMessage } = require('@black-moon-rewind/messaging');
const { accounts } = require('../state');

module.exports = async (message, ctx) => {
  const { id: accountId, password } = message;
  const account = accounts.get(accountId);
  if (!account || account.password !== password) {
    throw new Error('invalid account or password');
  }
  await ctx.handshake('auth', accountId);
  await ctx.handshake('world', accountId);
  await ctx.setHeaders({ accountId });
  await ctx.send(new AccountRegisteredMessage());
};
