const crypto = require('crypto');
const { Timer } = require('../../shared/models');
const movementHelper = require('./movement-helper');
const { MOVEMENT_BUFFER_SIZE } = require('../config');

class Character {
  constructor() {
    this.id = `${crypto.randomInt(1, 0xffff)}`;
    this.name = null;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.exhaustTimer = null;
    this.path = [];
    this.pathUpdated = false;
    this.chatterChannels = [];
    this.items = [];
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  tick(events) {
    if (this.pathUpdated) {
      events.emit('path-updated-server-message', { characterId: this.id });
      this.pathUpdated = false;
    }
  }

  subTick(events, time) {
    if (this.exhaustTimer !== null) {
      const remainingExhaustMs = this.exhaustTimer.getRemainingMs(time);
      if (remainingExhaustMs <= 0) {
        if (this.path.length) {
          const [offsetX, offsetY] = movementHelper.getOffset(
            this.path.shift()
          );
          this.updatePosition(this.x + offsetX, this.y + offsetY);
          const exhaustSeconds =
            movementHelper.getExhaustMs(offsetX, offsetY) / 1000 +
            remainingExhaustMs / 1000;
          this.exhaustTimer.start(exhaustSeconds, time);
        } else {
          this.exhaustTimer = null;
        }
      }
    } else if (this.path.length > 0) {
      const [offsetX, offsetY] = movementHelper.getOffset(this.path.shift());
      this.updatePosition(this.x + offsetX, this.y + offsetY);
      const exhaustSeconds =
        movementHelper.getExhaustMs(offsetX, offsetY) / 1000;
      this.exhaustTimer = new Timer();
      this.exhaustTimer.start(exhaustSeconds, time);
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
        this.path.splice(1, this.path.length - 1);
      }
      for (
        let i = 0;
        i < distance && this.path.length < MOVEMENT_BUFFER_SIZE;
        i += 1
      ) {
        this.path.push(direction);
      }
    }
    this.pathUpdated = true;
  }
}

module.exports = Character;
