const { PATH_BEAT } = require('../config');

class MovementHelper {
  static getOffset(direction) {
    switch (direction) {
      case 0:
        return [0, 0];
      case 1:
        return [0, -1];
      case 2:
        return [1, -1];
      case 3:
        return [1, 0];
      case 4:
        return [1, 1];
      case 5:
        return [0, 1];
      case 6:
        return [-1, 1];
      case 7:
        return [-1, 0];
      case 8:
        return [-1, -1];
      default:
        throw new Error(`invalid direction ${direction}`);
    }
  }

  static getExhaustMs(offsetX, offsetY) {
    return PATH_BEAT * Math.sqrt((Math.abs(offsetX) + Math.abs(offsetY)) / 2);
  }
}

module.exports = MovementHelper;
