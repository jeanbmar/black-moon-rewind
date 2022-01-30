const RegisterAccount = require('./client-payloads/register-account');

class PayloadFactory {
    static getPayloadByType(type) {
        switch (type) {
        case 0x0e:
            return RegisterAccount;
        default:
            throw new Error(`unknown payload type ${type}`);
        }
    }
}

module.exports = PayloadFactory;
