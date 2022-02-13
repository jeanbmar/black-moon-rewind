const { CharacterDataMessage } = require('@black-moon-rewind/messaging');
const { PATH_BEAT } = require('../config');
const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const session = sessions.get(socket);
  const { id: accountId } = session;
  const { id: characterId } = message;
  const character = characters.get(characterId);
  if (character.accountId !== accountId) {
    return;
  }
  session.characterId = characterId;
  const characterData = new CharacterDataMessage();
  characterData.name = character.name;
  characterData.x = character.x;
  characterData.y = character.y;
  characterData.z = character.z;
  characterData.items = character.items;
  characterData.pathBeat = PATH_BEAT;
  this.emit(
    'open-chatter-channels-session-server-message',
    { accountId, characterId },
    socket
  );
  socket.send(characterData);
};
