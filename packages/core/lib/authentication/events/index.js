const { EventEmitter } = require('events');

const events = new EventEmitter();

events.on(
  'authenticate-server-version-message',
  require('./authenticate-server-version-message')
);
events.on(
  'get-character-list-message',
  require('./get-character-list-message')
);
events.on('register-account-message', require('./register-account-message'));
events.on('exit-game-message', require('./exit-game-message'));

module.exports = events;
