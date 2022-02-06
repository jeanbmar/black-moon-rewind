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
    KeepAliveOk,
    Unknown,
    MoveTop,
    MoveTopRight,
    MoveRight,
    MoveBottomRight,
    MoveBottom,
    MoveBottomLeft,
    MoveLeft,
    MoveTopLeft,
    GetLagOk,
    UpdatePath,
    DirectTalk,
    StopPath,
} = require('./entities/messages');

class MessageFactory {
    static createMessageByType(type) {
        switch (type) {
        case 0:
            return new Ack();
        case 0x01:
            return new MoveTop();
        case 0x02:
            return new MoveTopRight();
        case 0x03:
            return new MoveRight();
        case 0x04:
            return new MoveBottomRight();
        case 0x05:
            return new MoveBottom();
        case 0x06:
            return new MoveBottomLeft();
        case 0x07:
            return new MoveLeft();
        case 0x08:
            return new MoveTopLeft();
        case 0x0a:
            return new KeepAliveOk();
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
        case 0x1e:
            return new DirectTalk();
        case 0x2e:
            return new EnterGame();
        case 0x30:
            return new JoinChatterChannels();
        case 0x3e:
            return new GetSpellList();
        case 0x63:
            return new AuthenticateServerVersion();
        case 0x99:
            return new UpdatePath();
        case 0x9a:
            return new GetLagOk();
        case 0x9c:
            return new StopPath();
        default:
            return new Unknown();
        }
    }
}

module.exports = MessageFactory;
