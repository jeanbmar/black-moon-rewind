const { world } = require('../state');

module.exports = function listener() {
  world.subTick(this);
};
