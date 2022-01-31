const entities = require('./entities');
const MessageManager = require('./message-manager');

module.exports = {
    MessageManager,
    ...entities,
};
