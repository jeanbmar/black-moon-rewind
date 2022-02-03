const process = require('process');
const crypto = require('crypto');
const serverEvents = require('./server-events');

const PATH_BEAT_MS = 175;

class Character {
    constructor() {
        this.id = crypto.randomInt(1, 0xFFFF);
        this.name = 'Black Moon Rewind';
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.lastTickMs = 0;
        this.movementBuffer = [];
    }

    tick() {
        const nowMs = Number(process.hrtime.bigint()) / 1000000;
        if (nowMs - this.lastTickMs >= PATH_BEAT_MS) {
            if (this.movementBuffer.length > 0) {
                const [direction] = this.movementBuffer.splice(0, 1);
                this.lastTickMs = nowMs;
                switch (direction) {
                    case 1:
                        this.y -= 1;
                        break;
                    case 2:
                        this.y -= 1;
                        this.x += 1;
                        break;
                    case 3:
                        this.x += 1;
                        break;
                    case 4:
                        this.x += 1;
                        this.y += 1;
                        break;
                    case 5:
                        this.y += 1;
                        break;
                    case 6:
                        this.x -= 1;
                        this.y += 1;
                        break;
                    case 7:
                        this.x -= 1;
                        break;
                    case 8:
                        this.x -= 1;
                        this.y -= 1;
                        break;
                    default:
                        throw new Error(`invalid direction ${direction}`);
                }
                serverEvents.emit('UnitMoved', this);
            }
        }
    }

    move(direction, distance) {
        // todo keep existing movements only if they have the same direction as new ones
        this.movementBuffer = this.movementBuffer.slice(distance);
        for (let i = 0; i < distance; i += 1) {
            this.movementBuffer.push(direction);
        }
    }
}

module.exports = Character;
