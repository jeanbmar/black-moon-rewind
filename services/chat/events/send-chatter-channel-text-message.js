const { ChatterChannelTextMessage } = require('@black-moon-rewind/messaging');
const { sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { characterId } = sessions.get(socket);
  const character = characters.get(characterId);
  const textMessage = new ChatterChannelTextMessage();
  textMessage.channelName = message.channelName;
  textMessage.senderName = character.name;
  textMessage.text = message.text;
  socket.send(textMessage);
};
