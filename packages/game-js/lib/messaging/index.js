const middlewares = require('./middlewares');
const Client = require('./client');

module.exports = {
  Client,
  ...middlewares,
};
