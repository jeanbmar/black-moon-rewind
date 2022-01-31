const Entity = require('../entity');

class Message extends Entity {
    static type = -1;

    constructor() {
        super();
        this.header = {};
    }
}

module.exports = Message;
