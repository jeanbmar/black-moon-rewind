const { sessions } = require('../state');

module.exports = function listener() {
  sessions.forEach(({ characterId }) => {
    if (characterId) {
      this.emit('update-character-server-command', { characterId });
    }
  });
  this.emit('update-time-server-command');
};
