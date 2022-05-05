const { ServerVersionMessage } = require('@black-moon-rewind/messaging');

module.exports = async (message, ctx) => {
  await ctx.send(new ServerVersionMessage());
};
