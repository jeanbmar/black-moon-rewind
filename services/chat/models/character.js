class Character {
  constructor() {
    this.id = null;
    this.name = null;
    this.chatterChannels = [];
  }

  addChatterChannel(chatterChannelId) {
    const currentIndex = this.chatterChannels.findIndex(
      ({ id }) => chatterChannelId === id
    );
    if (currentIndex === -1) {
      this.chatterChannels.push({ id: chatterChannelId });
    }
  }

  removeChatterChannel(chatterChannelId) {
    const currentIndex = this.chatterChannels.findIndex(
      ({ id }) => chatterChannelId === id
    );
    if (currentIndex > -1) {
      this.chatterChannels.splice(currentIndex, 1);
    }
  }
}

module.exports = Character;
