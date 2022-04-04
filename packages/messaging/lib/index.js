const entities = require('./entities');
const types = require('./types');
const MessageFactory = require('./message-factory');

module.exports = {
  MessageFactory,
  ...entities,
  ...types,
};
