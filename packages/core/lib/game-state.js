const Time = require('./time');

class GameState {
  constructor() {
    this.character = null;
    this.chatterChannels = new Map();
    this.time = new Time();
  }

  update() {
    this.character.subTick();
    if (this.time.isFullTick()) {
      this.character.tick();
    }
    this.time.increaseSubTick();
  }
}

module.exports = new GameState();
