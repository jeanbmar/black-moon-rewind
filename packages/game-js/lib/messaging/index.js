const streams = require('./streams');
const Client = require('./client');

module.exports = {
  Client,
  ...streams,
};
