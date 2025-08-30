const messages = require('./entities/messages');

const { UnknownMessage } = messages;

const typeMap = new Map(
  Object.values(messages).map((message) => [message.type, message])
);
const keyMap = new Map(
  Object.values(messages).map((message) => [message.key, message])
);

class MessageFactory {
  static createMessageByType(type) {
    // eslint-disable-next-line new-cap
    return new this.getMessageByType(type);
  }

  static getMessageByType(type) {
    return typeMap.get(type) ?? UnknownMessage;
  }

  static getMessageByKey(key) {
    return keyMap.get(key) ?? UnknownMessage;
  }
}

module.exports = MessageFactory;
