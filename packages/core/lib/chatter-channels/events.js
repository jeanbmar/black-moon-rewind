const { EventEmitter } = require('events');
const { ChatterChannelList } = require('@black-moon-rewind/messaging');
const ChatterChannel = require('./models/chatter-channel');
const ChatterChannelMember = require('./models/chatter-channel-member');
const chatterChannels = require('./service');

const events = new EventEmitter();

events.on(
  'join-chatter-channels-server-command',
  function listener(message, socket) {
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
    });
    this.emit(
      'get-user-chatter-channel-list-server-command',
      {
        character: { id: message.character.id },
      },
      socket
    );
  }
);

events.on('chatter-channel-list', ({ channels, character }, socket) => {
  const chatterChannelList = new ChatterChannelList();
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
});

module.exports = events;
