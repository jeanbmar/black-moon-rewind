const { Time } = require('../../shared').models;

class World {
  constructor() {
    // fixme we need to access online players
    this.characters = new Set();
    this.time = new Time();
  }

  subTick(events) {
    this.character.subTick(events, this.time);
    if (this.time.isFullTick(4)) {
      this.character.tick(events, this.time);
    }
    this.time.increaseTick();
  }
}

module.exports = World;
