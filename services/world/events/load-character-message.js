const { CharacterDataMessage } = require('@black-moon-rewind/messaging');
const { PATH_BEAT } = require('../config');
const { sessions, charactersByName } = require('../state');

module.exports = function listener(message, socket) {
  const session = sessions.get(socket);
  const { id: accountId } = session;
  const { name } = message;
  const character = charactersByName.get(name);
  if (character.accountId !== accountId) {
    return;
  }
  session.characterId = character.id;
  const characterData = new CharacterDataMessage();
  characterData.id = character.unitId;
  characterData.x = character.x;
  characterData.y = character.y;
  characterData.z = character.z;
  characterData.items = character.items;
  characterData.pathBeat = PATH_BEAT;
  this.emit(
    'open-chatter-channels-session-server-message',
    { accountId, characterId: character.id },
    socket
  );
  socket.send(characterData);
};
