const { EventEmitter } = require('events');
const { EntityMoved } = require('@black-moon-rewind/messaging');
const activeConnections = require('./active-connections');

const events = new EventEmitter();

events.on('UnitMoved', (unit) => {
    const entityMoved = new EntityMoved();
    entityMoved.x = unit.x;
    entityMoved.y = unit.y;
    entityMoved.unit = { id: unit.id };
    activeConnections.forEach((socket) => {
        socket.send(entityMoved);
    });
});

module.exports = events;
