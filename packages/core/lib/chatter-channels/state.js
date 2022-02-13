const chatterChannels = new Map();
const sessions = new Map();

// todo use caching when sync is implemented
// todo manage getting channelByName

module.exports = {
  chatterChannels,
  sessions,
};
