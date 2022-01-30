const Ack = require('./ack');
const RegisterAccount = require('./client-messages/register-account');
const AuthenticateServerVersion = require('./client-messages/authenticate-server-version');
const GetCharacterList = require('./client-messages/get-character-list');
const LoadCharacter = require('./client-messages/load-character');
const Unknown = require('./client-messages/unknown');

class MessageFactory {
    static createMessageByType(type) {
        switch (type) {
        case 0:
            return new Ack();
        case 0x0d:
            return new LoadCharacter();
        case 0x0e:
            return new RegisterAccount();
        case 0x1a:
            return new GetCharacterList();
        case 0x63:
            return new AuthenticateServerVersion();
        default:
            return new Unknown();
        }
    }
}

module.exports = MessageFactory;
