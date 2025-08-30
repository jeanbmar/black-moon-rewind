const { characters } = require('../state');

module.exports = async (message, ctx) => {
  const character = characters.get(ctx.headers.characterId);
  character.addMove(6, message.distance);
};
