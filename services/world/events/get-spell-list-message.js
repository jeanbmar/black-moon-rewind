const { SpellListMessage } = require('@black-moon-rewind/messaging');

module.exports = function listener(message, socket) {
  const spellList = new SpellListMessage();
  socket.send(spellList);
};
