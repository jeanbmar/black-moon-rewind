const { chatterChannels } = require('../state');
const { ChatterChannel, ChatterChannelMember } = require('../models');

module.exports = function listener(message, socket) {
  message.channels.forEach(({ name, password }) => {
    let chatterChannel = chatterChannels.get(name); // todo call getByName instead
    if (!chatterChannel) {
      chatterChannel = new ChatterChannel();
      chatterChannel.updateName(name);
      chatterChannel.id = chatterChannel.name; // todo replace with db id
      chatterChannel.updatePassword(password);
      chatterChannels.set(chatterChannel.id, chatterChannel);
    }
    if (
      !chatterChannel.hasMember(message.character.id) &&
      chatterChannel.authenticate(password)
    ) {
      const chatterChannelMember = new ChatterChannelMember();
      chatterChannelMember.id = message.character.id;
      chatterChannelMember.name = message.character.name;
      chatterChannel.addMember(chatterChannelMember);
      this.emit('chatter-channel-joined-server-command', {
        channel: { id: chatterChannel.id },
        character: { id: message.character.id },
      });
    }
    if (chatterChannel.hasMember(message.character.id)) {
      const chatterChannelMember = chatterChannel.findMember(
        message.character.id
      );
      if (!chatterChannelMember.online) {
        chatterChannelMember.online = true;
        chatterChannel.online += 1;
      }
    }
  });
  this.emit(
    'get-chatter-channel-list-server-command',
    {
      character: { id: message.character.id },
    },
    socket
  );
};
