const messaging = require('./messaging');
const microServices = require('./micro-services');

module.exports = {
  ...messaging,
  ...microServices,
};
