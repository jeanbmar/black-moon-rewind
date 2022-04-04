const { CharacterListMessage } = require('@black-moon-rewind/messaging');
const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { id } = sessions.get(socket);
  const accountCharacters = Array.from(characters.values()).filter(
    ({ accountId }) => accountId === id
  );
  const characterList = new CharacterListMessage();
  characterList.characters = accountCharacters.map((accountCharacter) => ({
    name: accountCharacter.name,
    level: accountCharacter.level,
  }));
  socket.send(characterList);
};
