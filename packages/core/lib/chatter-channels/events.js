const { EventEmitter } = require('events');
const {
  ChatterChannelListMessage,
} = require('@black-moon-rewind/messaging');
const ChatterChannel = require('./models/chatter-channel');
const ChatterChannelMember = require('./models/chatter-channel-member');
const chatterChannels = require('./service');

const events = new EventEmitter();

events.on(
  'join-chatter-channels-server-message',
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
  }
);

events.on(
  'get-chatter-channel-list-server-message',
  ({ channels, character }, socket) => {
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
  }
);

events.on(
  'remove-from-chatter-channels-server-message',
  function listener({ channel, character }, socket) {
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
  }
);

module.exports = events;
