const { EventEmitter } = require('events');

const events = new EventEmitter();

events.on(
  'open-chatter-channels-session-server-message',
  require('./open-chatter-channels-session-server-message')
);
events.on(
  'join-chatter-channels-message',
  require('./join-chatter-channels-message')
);
events.on(
  'get-chatter-channel-list-message',
  require('./get-chatter-channel-list-message')
);
events.on(
  'get-chatter-channel-list-server-message',
  require('./get-chatter-channel-list-server-message')
);
events.on(
  'remove-from-chatter-channels-message',
  require('./remove-from-chatter-channels-message')
);
events.on(
  'close-session-server-message',
  require('./close-session-server-message')
);

module.exports = events;
