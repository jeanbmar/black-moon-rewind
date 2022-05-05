const { CharacterListMessage } = require('@black-moon-rewind/messaging');
const { characters } = require('../state');

module.exports = async (message, ctx) => {
  const accountCharacters = Array.from(characters.values()).filter(
    ({ accountId }) => accountId === ctx.headers.accountId
  );
  await ctx.send(
    new CharacterListMessage({
      characters: accountCharacters.map((accountCharacter) => ({
        name: accountCharacter.name,
        level: accountCharacter.level,
      })),
    })
  );
};
