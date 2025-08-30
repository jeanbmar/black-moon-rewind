const clientMessages = require('./client-messages');
const serverMessages = require('./server-messages');
const serviceMessages = require('./service-messages');

module.exports = {
  ...clientMessages,
  ...serverMessages,
  ...serviceMessages,
};
