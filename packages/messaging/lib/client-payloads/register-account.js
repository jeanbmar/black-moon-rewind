const Payload = require('../payload');
const { String } = require('@black-moon-rewind/byte-stream-scalars');

class RegisterAccount extends Payload {
    static type = 0x0E;

    read(byteStream) {
        this.accountName = String.read(byteStream);
        this.password = String.read(byteStream);
    }
}

module.exports = RegisterAccount;
