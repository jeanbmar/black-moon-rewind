const { EventEmitter } = require('events');

const events = new EventEmitter();

events.on(
  'open-chatter-channels-session-server-message',
  require('./open-chatter-channels-session-server-message')
);
events.on(
  'join-chatter-channels-server-message',
  require('./join-chatter-channels-server-message')
);
events.on(
  'get-chatter-channel-list-server-message',
  require('./get-chatter-channel-list-server-message')
);
events.on(
  'remove-from-chatter-channels-server-message',
  require('./remove-from-chatter-channels-server-message')
);

module.exports = events;
