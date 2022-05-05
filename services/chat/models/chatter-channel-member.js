const {
  MEMBER_AVAILABLE,
  MEMBER_MUTED,
} = require('./chatter-channel-member-status-enum');

class ChatterChannelMember {
  constructor() {
    this.id = null;
    this.name = null;
    this.online = false;
    this.status = MEMBER_AVAILABLE;
  }

  selfMute() {
    this.status = MEMBER_MUTED;
  }

  selfUnmute() {
    this.status = MEMBER_AVAILABLE;
  }
}

module.exports = ChatterChannelMember;
