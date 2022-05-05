const { EnteredGameMessage } = require('@black-moon-rewind/messaging');
const { characters } = require('../state');

module.exports = async (message, ctx) => {
  const character = characters.get(ctx.headers.characterId);
  await ctx.send(
    EnteredGameMessage.create({
      entities: [
        {
          x: character.x,
          y: character.y,
          unit: { id: character.unitId },
        },
      ],
    })
  );
};
