const { CharacterDataMessage } = require('@black-moon-rewind/messaging');
const { PATH_BEAT } = require('../config');
const { charactersByName } = require('../state');

module.exports = async (message, ctx) => {
  const character = charactersByName.get(message.name);
  if (character.accountId !== ctx.headers.accountId) {
    throw new Error('character does not belong to account');
  }
  await ctx.setHeaders({ characterId: character.id });
  await ctx.send(
    CharacterDataMessage.create({
      id: character.unitId,
      x: character.x,
      y: character.y,
      z: character.z,
      items: character.items,
      pathBeat: PATH_BEAT,
    })
  );
};
