const { EventEmitter } = require('events');

const events = new EventEmitter();

events.on('enter-game-message', require('./enter-game-message'));
events.on('load-character-message', require('./load-character-message'));
events.on(
  'open-world-session-server-message',
  require('./open-world-session-server-message')
);
events.on(
  'path-updated-server-message',
  require('./path-updated-server-message')
);
events.on(
  'join-chatter-channels-message',
  require('./join-chatter-channels-message')
);
events.on(
  'chatter-channel-joined-server-command',
  require('./chatter-channel-joined-server-command')
);
events.on(
  'get-chatter-channel-list-server-command',
  require('./get-chatter-channel-list-server-command')
);
events.on(
  'chatter-channel-left-server-command',
  require('./chatter-channel-left-server-command')
);
events.on(
  'remove-from-chatter-channels-message',
  require('./remove-from-chatter-channels-message')
);
events.on(
  'get-chatter-channel-list-message',
  require('./get-chatter-channel-list-message')
);
events.on('get-spell-list-message', require('./get-spell-list-message'));
events.on('view-equipped-message', require('./view-equipped-message'));
events.on('update-path-message', require('./update-path-message'));

events.on('stop-path-message', require('./stop-path-message'));
events.on('move-top-message', require('./move-top-message'));
events.on('move-top-right-message', require('./move-top-right-message'));
events.on('move-right-message', require('./move-right-message'));
events.on('move-bottom-right-message', require('./move-bottom-right-message'));
events.on('move-bottom-message', require('./move-bottom-message'));
events.on('move-bottom-left-message', require('./move-bottom-left-message'));
events.on('move-left-message', require('./move-left-message'));
events.on('move-top-left-message', require('./move-top-left-message'));
events.on(
  'server-update-server-message',
  require('./server-update-server-message')
);

module.exports = events;
