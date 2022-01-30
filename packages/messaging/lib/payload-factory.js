const RegisterAccount = require('./client-payloads/register-account');
const UnknownPayload = require('./unknown-payload');

class PayloadFactory {
    static getPayloadByType(type) {
        switch (type) {
        case 0x0e:
            return RegisterAccount;
        default:
            return UnknownPayload;
        }
    }
}

module.exports = PayloadFactory;
