const { CharacterListMessage } = require('@black-moon-rewind/messaging');
const { characters, sessions } = require('../state');

module.exports = (session, state, push) => {
  const { id } = sessions.get(state.from);
  const accountCharacters = Array.from(characters.values()).filter(
    ({ accountId }) => accountId === id
  );
  const characterList = new CharacterListMessage();
  characterList.characters = accountCharacters.map((accountCharacter) => ({
    name: accountCharacter.name,
    level: accountCharacter.level,
  }));
  push(null, {
    ...state,
    key: state.from,
    message: characterList,
  });
};
