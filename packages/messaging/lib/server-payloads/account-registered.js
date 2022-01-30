const { String, UInt8 } = require('@black-moon-rewind/byte-stream-scalars');
const Payload = require('../payload');

class AccountRegistered extends Payload {
    static type = 0x0E;

    write(byteStream) {
        UInt8.write(byteStream, this.flag ?? 0);
        String.write(byteStream, this.message ?? 'Welcome to the Black Moon Chronicles!');
    }
}

module.exports = AccountRegistered;
