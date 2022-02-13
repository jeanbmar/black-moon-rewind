const { chatterChannels } = require('../state');

module.exports = function listener({ channel, character }, socket) {
  const chatterChannel = chatterChannels.get(channel.name); // todo call getByName instead
  if (chatterChannel) {
    const chatterChannelMember = chatterChannel.findMember(character.id);
    if (chatterChannelMember) {
      chatterChannel.removeMember(character.id);
      if (chatterChannelMember.online) {
        chatterChannelMember.online = false;
        chatterChannel.online -= 1;
      }
    }
    if (chatterChannel.members.length === 0) {
      chatterChannels.delete(chatterChannel.id);
    }
    this.emit('chatter-channel-left-server-command', {
      channel: { id: chatterChannel.id },
      character: { id: character.id },
    });
    this.emit(
      'get-chatter-channel-list-server-command',
      {
        character: { id: character.id },
      },
      socket
    );
  }
};
