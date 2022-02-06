class Time {
    constructor() {
        this.subTick = 0;
    }

    increaseSubTick() {
        this.subTick += 1;
    }

    isFullTick() {
        return this.subTick % 4 === 0;
    }
}

module.exports = Time;
