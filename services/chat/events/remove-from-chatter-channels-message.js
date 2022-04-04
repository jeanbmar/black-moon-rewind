const { chatterChannels, sessions, characters } = require('../state');

module.exports = function listener({ name }, socket) {
  const { characterId } = sessions.get(socket);
  const character = characters.get(characterId);
  const chatterChannel = chatterChannels.get(name); // todo call getByName instead
  if (chatterChannel) {
    const chatterChannelMember = chatterChannel.findMember(characterId);
    if (chatterChannelMember) {
      chatterChannel.removeMember(characterId);
      if (chatterChannelMember.online) {
        chatterChannelMember.online = false;
        chatterChannel.online -= 1;
      }
    }
    if (chatterChannel.members.length === 0) {
      chatterChannels.delete(chatterChannel.id);
    }
    character.removeChatterChannel(chatterChannel.id);
    this.emit(
      'get-chatter-channel-list-server-message',
      { characterId },
      socket
    );
  }
};
