const { TICK_RATE } = require('../config');

class Timer {
  constructor() {
    this.tick = 0;
  }

  getRemainingSeconds(time) {
    const ticks = this.tick - time.tick;
    return Math.round(ticks / TICK_RATE);
  }

  getRemainingMs(time) {
    const ticks = this.tick - time.tick;
    return Math.round(1000 * (ticks / TICK_RATE));
  }

  start(durationSeconds, time) {
    this.tick = time.tick + TICK_RATE * durationSeconds;
  }
}

module.exports = Timer;
