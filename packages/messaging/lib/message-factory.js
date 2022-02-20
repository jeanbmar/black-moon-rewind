const {
  ClientAckMessage,
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
  ServerAckMessage,
  AccountRegisteredMessage,
  CharacterDataMessage,
  CharacterListMessage,
  ChatterChannelJoinedMessage,
  ChatterChannelListMessage,
  ChatterChannelTextMessage,
  EnteredGameMessage,
  EntityMovedMessage,
  EquipmentDataMessage,
  GameExitedMessage,
  GetLagMessage,
  KeepAliveMessage,
  PathBeatUpdateMessage,
  PathUpdatedMessage,
  ServerVersionMessage,
  SpellListMessage,
} = require('./entities/messages');

class MessageFactory {
  static createMessageByType(type) {
    // eslint-disable-next-line new-cap
    return new this.getMessageByType(type);
  }

  static getMessageByType(type) {
    return this.getMessageById(type, 'type');
  }

  static getMessageByKey(key) {
    return this.getMessageById(key, 'key');
  }

  static getMessageById(id, type) {
    switch (id) {
      case ClientAckMessage[type]:
        return ClientAckMessage;
      case ServerAckMessage[type]:
        return ServerAckMessage;
      case MoveTopMessage[type]:
        return MoveTopMessage;
      case MoveTopRightMessage[type]:
        return MoveTopRightMessage;
      case MoveRightMessage[type]:
        return MoveRightMessage;
      case MoveBottomRightMessage[type]:
        return MoveBottomRightMessage;
      case MoveBottomMessage[type]:
        return MoveBottomMessage;
      case MoveBottomLeftMessage[type]:
        return MoveBottomLeftMessage;
      case MoveLeftMessage[type]:
        return MoveLeftMessage;
      case MoveTopLeftMessage[type]:
        return MoveTopLeftMessage;
      case KeepAliveOkMessage[type]:
        return KeepAliveOkMessage;
      case LoadCharacterMessage[type]:
        return LoadCharacterMessage;
      case RegisterAccountMessage[type]:
        return RegisterAccountMessage;
      case ViewEquippedMessage[type]:
        return ViewEquippedMessage;
      case ExitGameMessage[type]:
        return ExitGameMessage;
      case GetCharacterListMessage[type]:
        return GetCharacterListMessage;
      case DirectTalkMessage[type]:
        return DirectTalkMessage;
      case EnterGameMessage[type]:
        return EnterGameMessage;
      case JoinChatterChannelsMessage[type]:
        return JoinChatterChannelsMessage;
      case SendChatterChannelTextMessage[type]:
        return SendChatterChannelTextMessage;
      case GetChatterChannelUserListingMessage[type]:
        return GetChatterChannelUserListingMessage;
      case GetSpellListMessage[type]:
        return GetSpellListMessage;
      case RemoveFromChatterChannelsMessage[type]:
        return RemoveFromChatterChannelsMessage;
      case GetChatterChannelListMessage[type]:
        return GetChatterChannelListMessage;
      case AuthenticateServerVersionMessage[type]:
        return AuthenticateServerVersionMessage;
      case UpdatePathMessage[type]:
        return UpdatePathMessage;
      case GetLagOkMessage[type]:
        return GetLagOkMessage;
      case StopPathMessage[type]:
        return StopPathMessage;
      case AccountRegisteredMessage[type]:
        return AccountRegisteredMessage;
      case CharacterDataMessage[type]:
        return CharacterDataMessage;
      case CharacterListMessage[type]:
        return CharacterListMessage;
      case ChatterChannelJoinedMessage[type]:
        return ChatterChannelJoinedMessage;
      case ChatterChannelListMessage[type]:
        return ChatterChannelListMessage;
      case ChatterChannelTextMessage[type]:
        return ChatterChannelTextMessage;
      case EnteredGameMessage[type]:
        return EnteredGameMessage;
      case EntityMovedMessage[type]:
        return EntityMovedMessage;
      case EquipmentDataMessage[type]:
        return EquipmentDataMessage;
      case GameExitedMessage[type]:
        return GameExitedMessage;
      case GetLagMessage[type]:
        return GetLagMessage;
      case KeepAliveMessage[type]:
        return KeepAliveMessage;
      case PathBeatUpdateMessage[type]:
        return PathBeatUpdateMessage;
      case PathUpdatedMessage[type]:
        return PathUpdatedMessage;
      case ServerVersionMessage[type]:
        return ServerVersionMessage;
      case SpellListMessage[type]:
        return SpellListMessage;
      default:
        return UnknownMessage;
    }
  }
}

module.exports = MessageFactory;
