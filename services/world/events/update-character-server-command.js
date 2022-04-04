const { characters, time } = require('../state');

module.exports = function listener({ characterId }) {
  const character = characters.get(characterId);
  character.subTick(time);
  if (time.isFullTick(4)) {
    if (character.pathUpdated) {
      this.emit('path-updated-server-message', { characterId });
      character.pathUpdated = false;
    }
  }
};
