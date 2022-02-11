const { EventEmitter } = require('events');
const { PathUpdated } = require('@black-moon-rewind/messaging');
const activeConnections = require('./active-connections');
const gameState = require('./game-state');

const events = new EventEmitter();

events.on('PathUpdated', (unit) => {
  const pathUpdated = new PathUpdated();
  pathUpdated.x = unit.x;
  pathUpdated.y = unit.y;
  pathUpdated.unit = { id: unit.id };
  pathUpdated.x2 = unit.x;
  pathUpdated.y2 = unit.y;
  pathUpdated.delay = unit.exhaustTimer?.getRemainingMs(gameState.time) ?? 0;
  pathUpdated.path = unit.path;
  activeConnections.forEach((socket) => {
    socket.send(pathUpdated);
  });
});

module.exports = events;
