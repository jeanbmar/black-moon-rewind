const { TICK_RATE } = require('./constants');

class Timer {
    constructor() {
        this.subTick = 0;
    }

    getRemainingSeconds(time) {
        const ticks = this.subTick - time.subTick;
        return Math.round(ticks / TICK_RATE);
    }

    getRemainingMs(time) {
        const ticks = this.subTick - time.subTick;
        return Math.round(1000 * (ticks / TICK_RATE));
    }

    start(durationSeconds, time) {
        this.subTick = time.subTick + TICK_RATE * durationSeconds;
    }
}

module.exports = Timer;
