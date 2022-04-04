const { ChatterChannelListMessage } = require('@black-moon-rewind/messaging');
const { chatterChannels, characters } = require('../state');

module.exports = function listener({ characterId }, socket) {
  const character = characters.get(characterId);
  const chatterChannelList = new ChatterChannelListMessage();
  character.chatterChannels.forEach(({ id }) => {
    const chatterChannel = chatterChannels.get(id);
    const chatterChannelMember = chatterChannel.findMember(character.id);
    if (chatterChannel && chatterChannelMember) {
      chatterChannelList.channels.push({
        name: chatterChannel.name,
        online: chatterChannel.online,
        status: chatterChannelMember.status,
      });
    }
  });
  // fixme with socket io
  socket.send(chatterChannelList);
};
