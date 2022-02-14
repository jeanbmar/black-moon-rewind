const net = require('net');
const kebabCase = require('lodash.kebabcase');
const { BlackMoonSocket } = require('@black-moon-rewind/microservices');
const { EventEmitter } = require('events');
const { KeepAliveOkMessage } = require('@black-moon-rewind/messaging');
const { events: chatEvents } = require('./chatter-channels');
const { events: authenticationEvents } = require('./authentication');
const { events: worldEvents } = require('./world');
const { TICK_RATE } = require('./shared').config;

const events = new EventEmitter();
[chatEvents, authenticationEvents, worldEvents].forEach((eventEmitter) => {
  eventEmitter.eventNames().forEach((eventName) => {
    eventEmitter.listeners(eventName).forEach((listener) => {
      events.on(eventName, listener);
    });
  });
});
events.on('keep-alive-ok-message', () => {});
events.on('unknown-message', (message, socket) => {
  console.log(`unknown payload ${JSON.stringify(message)}`);
  socket.send(new KeepAliveOkMessage());
});
setInterval(() => {
  events.emit('update-world-server-message');
}, 1000 / TICK_RATE);

const gateway = net.createServer();

gateway.on('connection', (netSocket) => {
  console.log('new player connection');
  // eslint-disable-next-line no-underscore-dangle
  const socket = new BlackMoonSocket({ handle: netSocket._handle });
  socket.setNoDelay(true);
  socket.setTimeout(2000);
  socket.on('error', console.log);
  socket.on('message', async (message) =>
    console.log('received', message.constructor.name)
  );
  socket.on('message', async (message) => {
    const handlerName = kebabCase(message.constructor.name);
    if (events.listenerCount(handlerName) === 0) {
      console.warn(`no handler for payload ${handlerName}`);
      return;
    }
    events.emit(handlerName, message, socket);
  });
  socket.on('close', () => {
    events.emit('close-session-server-message');
  });
});

module.exports = gateway;
