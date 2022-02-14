const { ChatterChannel, ChatterChannelMember } = require('../models');
const { chatterChannels, sessions, characters } = require('../state');

module.exports = function listener(message, socket) {
  const { characterId } = sessions.get(socket);
  const character = characters.get(characterId);
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
      !chatterChannel.hasMember(characterId) &&
      chatterChannel.authenticate(password)
    ) {
      const chatterChannelMember = new ChatterChannelMember();
      chatterChannelMember.id = characterId;
      chatterChannelMember.name = character.name;
      chatterChannel.addMember(chatterChannelMember);
      character.addChatterChannel(chatterChannel.id);
    }
    if (chatterChannel.hasMember(characterId)) {
      const chatterChannelMember = chatterChannel.findMember(characterId);
      if (!chatterChannelMember.online) {
        chatterChannelMember.online = true;
        chatterChannel.online += 1;
      }
    }
  });
  this.emit('get-chatter-channel-list-server-message', { characterId }, socket);
};
