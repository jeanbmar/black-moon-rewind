const clientMessages = require('./client-messages');
const serverMessages = require('./server-messages');

module.exports = {
  ...clientMessages,
  ...serverMessages,
};
