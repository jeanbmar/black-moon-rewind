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
  'update-world-server-message',
  require('./update-world-server-message')
);
events.on(
  'update-character-server-command',
  require('./update-character-server-command')
);
events.on(
  'update-time-server-command',
  require('./update-time-server-command')
);
events.on(
  'close-session-server-message',
  require('./close-session-server-message')
);

module.exports = events;
