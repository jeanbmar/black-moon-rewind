const { characters } = require('../state');

module.exports = function listener(message) {
  const character = characters.get(message.character.id);
  const currentIndex = character.chatterChannels.findIndex(
    ({ id }) => message.channel.id === id
  );
  if (currentIndex === -1) {
    character.chatterChannels.push({ id: message.channel.id });
  }
};
