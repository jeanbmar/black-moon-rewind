const { GameExitedMessage } = require('@black-moon-rewind/messaging');

module.exports = (session, state, push) => {
  push(null, {
    ...state,
    key: state.from,
    message: new GameExitedMessage(),
  });
};
