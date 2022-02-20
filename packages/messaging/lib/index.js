const entities = require('./entities');
const MessageFactory = require('./message-factory');

module.exports = {
  MessageFactory,
  ...entities,
};
