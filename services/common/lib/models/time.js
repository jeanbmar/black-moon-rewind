class Time {
  constructor() {
    this.tick = 0;
  }

  increaseTick() {
    this.tick += 1;
  }

  isFullTick(period) {
    return this.tick % period === 0;
  }
}

module.exports = Time;
