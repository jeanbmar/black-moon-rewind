const {
  AckMessage,
  RegisterAccountMessage,
  AuthenticateServerVersionMessage,
  GetCharacterListMessage,
  LoadCharacterMessage,
  EnterGameMessage,
  ExitGameMessage,
  JoinChatterChannelsMessage,
  GetSpellListMessage,
  ViewEquippedMessage,
  KeepAliveOkMessage,
  UnknownMessage,
  MoveTopMessage,
  MoveTopRightMessage,
  MoveRightMessage,
  MoveBottomRightMessage,
  MoveBottomMessage,
  MoveBottomLeftMessage,
  MoveLeftMessage,
  MoveTopLeftMessage,
  GetLagOkMessage,
  UpdatePathMessage,
  DirectTalkMessage,
  StopPathMessage,
  GetChatterChannelListMessage,
  GetChatterChannelUserListingMessage,
  RemoveFromChatterChannelsMessage,
  SendChatterChannelTextMessage,
} = require('./entities/messages');

class MessageFactory {
  static createMessageByType(type) {
    switch (type) {
      case 0:
        return new AckMessage();
      case 0x01:
        return new MoveTopMessage();
      case 0x02:
        return new MoveTopRightMessage();
      case 0x03:
        return new MoveRightMessage();
      case 0x04:
        return new MoveBottomRightMessage();
      case 0x05:
        return new MoveBottomMessage();
      case 0x06:
        return new MoveBottomLeftMessage();
      case 0x07:
        return new MoveLeftMessage();
      case 0x08:
        return new MoveTopLeftMessage();
      case 0x0a:
        return new KeepAliveOkMessage();
      case 0x0d:
        return new LoadCharacterMessage();
      case 0x0e:
        return new RegisterAccountMessage();
      case 0x13:
        return new ViewEquippedMessage();
      case 0x14:
        return new ExitGameMessage();
      case 0x1a:
        return new GetCharacterListMessage();
      case 0x1e:
        return new DirectTalkMessage();
      case 0x2e:
        return new EnterGameMessage();
      case 0x30:
        return new JoinChatterChannelsMessage();
      case 0x31:
        return new SendChatterChannelTextMessage();
      case 0x32:
        return new GetChatterChannelUserListingMessage();
      case 0x3e:
        return new GetSpellListMessage();
      case 0x4a:
        return new RemoveFromChatterChannelsMessage();
      case 0x4b:
        return new GetChatterChannelListMessage();
      case 0x63:
        return new AuthenticateServerVersionMessage();
      case 0x99:
        return new UpdatePathMessage();
      case 0x9a:
        return new GetLagOkMessage();
      case 0x9c:
        return new StopPathMessage();
      default:
        return new UnknownMessage();
    }
  }
}

module.exports = MessageFactory;
