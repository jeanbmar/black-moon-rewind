const { PathUpdatedMessage } = require('@black-moon-rewind/messaging');
const { time, sessions, characters } = require('../state');

module.exports = function listener({ characterId }) {
  const character = characters.get(characterId);
  const pathUpdated = new PathUpdatedMessage();
  pathUpdated.x = character.x;
  pathUpdated.y = character.y;
  pathUpdated.unit = { id: character.unitId };
  pathUpdated.x2 = character.x;
  pathUpdated.y2 = character.y;
  pathUpdated.delay = character.exhaustTimer?.getRemainingMs(time) ?? 0;
  pathUpdated.path = character.path;
  // fixme with socket io
  sessions.forEach((session, socket) => {
    if (session.characterId === characterId) {
      socket.send(pathUpdated);
    }
  });
};
