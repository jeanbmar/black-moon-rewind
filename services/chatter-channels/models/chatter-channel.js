class ChatterChannel {
  constructor() {
    this.id = null;
    this.name = null;
    this.password = null;
    this.members = [];
    this.public = false;
    this.online = 0;
  }

  updateName(name) {
    const parsed = name.trim();
    if (parsed.length > 0) {
      this.name = parsed;
    }
  }

  updatePassword(password) {
    const parsed = password.trim();
    this.password = parsed.length > 0 ? parsed : null;
  }

  authenticate(password) {
    return this.password === null || this.password === password.trim();
  }

  hasMember(id) {
    return this.members.findIndex((member) => member.id === id) !== -1;
  }

  findMember(id) {
    return this.members.find((member) => member.id === id) ?? null;
  }

  addMember(chatterChannelMember) {
    if (this.findMember(chatterChannelMember.id) === null) {
      this.members.push(chatterChannelMember);
    }
  }

  removeMember(id) {
    const memberIndex = this.members.findIndex((member) => member.id === id);
    if (memberIndex >= 0) {
      this.members.splice(memberIndex, 1);
    }
  }
}

module.exports = ChatterChannel;
