const { KeepAliveMessage } = require('@black-moon-rewind/messaging');

module.exports = async (data, ctx) => {
  await ctx.send(new KeepAliveMessage());
};
