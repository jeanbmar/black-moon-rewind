const constants = require('../constants');

class ChatterChannelMember {
  constructor() {
    this.id = null;
    this.name = null;
    this.status = constants.MEMBER_OFFLINE;
  }
}

module.exports = ChatterChannelMember;
