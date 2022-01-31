const {
    Ack,
    RegisterAccount,
    AuthenticateServerVersion,
    GetCharacterList,
    LoadCharacter,
    EnterGame,
    ExitGame,
    JoinChatterChannels,
    GetSpellList,
    ViewEquipped,
    Unknown,
} = require('./entities/messages');

class MessageFactory {
    static createMessageByType(type) {
        switch (type) {
        case 0:
            return new Ack();
        case 0x0d:
            return new LoadCharacter();
        case 0x0e:
            return new RegisterAccount();
        case 0x13:
            return new ViewEquipped();
        case 0x14:
            return new ExitGame();
        case 0x1a:
            return new GetCharacterList();
        case 0x2e:
            return new EnterGame();
        case 0x30:
            return new JoinChatterChannels();
        case 0x3e:
            return new GetSpellList();
        case 0x63:
            return new AuthenticateServerVersion();
        default:
            return new Unknown();
        }
    }
}

module.exports = MessageFactory;
