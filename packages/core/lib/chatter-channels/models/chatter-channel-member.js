const constants = require('../constants');

class ChatterChannelMember {
  constructor() {
    this.id = null;
    this.name = null;
    this.online = false;
    this.status = constants.MEMBER_AVAILABLE;
  }

  mute() {
    this.status = constants.MEMBER_MUTED;
  }

  unmute() {
    this.status = constants.MEMBER_AVAILABLE;
  }
}

module.exports = ChatterChannelMember;
