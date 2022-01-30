const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Payload = require('../payload');

class RegisterAccount extends Payload {
    static type = 0x0E;

    read(byteStream) {
        this.accountName = String.read(byteStream);
        this.password = String.read(byteStream);
    }
}

module.exports = RegisterAccount;
