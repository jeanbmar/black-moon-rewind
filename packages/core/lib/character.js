const crypto = require('crypto');
const Timer = require('./timer');
const eventHandler = require('./event-handler');
const gameState = require('./game-state');
const movementHelper = require('./movement-helper');
const { MOVEMENT_BUFFER_SIZE } = require('./constants');

class Character {
    constructor() {
        this.id = crypto.randomInt(1, 0xFFFF);
        this.name = 'Black Moon Rewind';
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.exhaustTimer = null;
        this.path = [];
        this.pathUpdated = false;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }

    tick() {
        if (this.pathUpdated) {
            eventHandler.emit('PathUpdated', this);
            this.pathUpdated = false;
        }
    }

    subTick() {
        if (this.exhaustTimer !== null) {
            const remainingExhaustMs = this.exhaustTimer.getRemainingMs(gameState.time);
            if (remainingExhaustMs <= 0) {
                if (this.path.length) {
                    const [offsetX, offsetY] = movementHelper.getOffset(this.path.shift());
                    this.updatePosition(this.x + offsetX, this.y + offsetY);
                    const exhaustSeconds = movementHelper.getExhaustMs(offsetX, offsetY) / 1000 + remainingExhaustMs / 1000;
                    this.exhaustTimer.start(exhaustSeconds, gameState.time);
                } else {
                    this.exhaustTimer = null;
                }
            }
        } else if (this.path.length > 0) {
            const [offsetX, offsetY] = movementHelper.getOffset(this.path.shift());
            this.updatePosition(this.x + offsetX, this.y + offsetY);
            const exhaustSeconds = movementHelper.getExhaustMs(offsetX, offsetY) / 1000;
            this.exhaustTimer = new Timer();
            this.exhaustTimer.start(exhaustSeconds, gameState.time);
        }
    }

    updatePath(path, fromX, fromY) {
        this.path = path;
        this.pathUpdated = true;
    }

    stopPath() {
        this.path.splice(1, this.path.length - 1);
        this.pathUpdated = true;
    }

    addMove(direction, distance) {
        if (distance === 1) {
            this.path = [direction];
        } else {
            if (this.path.length > 0 && direction !== this.path[0]) {
                this.path.splice(1 , this.path.length - 1);
            }
            for (let i = 0; i < distance && this.path.length < MOVEMENT_BUFFER_SIZE; i += 1) {
                this.path.push(direction);
            }
        }
        this.pathUpdated = true;
    }
}

module.exports = Character;
