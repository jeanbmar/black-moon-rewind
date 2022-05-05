const { GameExitedMessage } = require('@black-moon-rewind/messaging');

module.exports = async (message, ctx) => {
  await ctx.send(new GameExitedMessage());
};
