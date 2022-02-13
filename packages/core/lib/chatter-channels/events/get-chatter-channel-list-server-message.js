const { ChatterChannelListMessage } = require('@black-moon-rewind/messaging');
const { chatterChannels } = require('../state');

module.exports = function listener({ channels, character }, socket) {
  const chatterChannelList = new ChatterChannelListMessage();
  channels.forEach(({ id }) => {
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
  socket.send(chatterChannelList);
};
