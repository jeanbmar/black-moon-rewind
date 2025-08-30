const { characters } = require('../state');

module.exports = async (message, ctx) => {
  const character = characters.get(ctx.headers.characterId);
  character.addMove(8, message.distance);
};
