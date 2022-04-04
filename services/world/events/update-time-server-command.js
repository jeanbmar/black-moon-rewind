const { time } = require('../state');

module.exports = function listener() {
  time.increaseTick();
};
