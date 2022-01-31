const Message = require('../../message');

class ViewEquipped extends Message {
    static type = 0x13
}

module.exports = ViewEquipped;
