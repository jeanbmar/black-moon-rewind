const AuthenticateServerVersion = require('./authenticate-server-version');
const EnterGame = require('./enter-game');
const ExitGame = require('./exit-game');
const GetCharacterList = require('./get-character-list');
const GetExtendedEntityInformation = require('./get-extended-entity-information');
const GetSpellList = require('./get-spell-list');
const LoadCharacter = require('./load-character');
const RegisterAccount = require('./register-account');
const Unknown = require('./unknown');
const ViewEquipped = require('./view-equipped');
const JoinChatterChannels = require('./join-chatter-channels');
const KeepAliveOk = require('./keep-alive-ok');

module.exports = {
    AuthenticateServerVersion,
    EnterGame,
    ExitGame,
    GetCharacterList,
    GetExtendedEntityInformation,
    GetSpellList,
    LoadCharacter,
    RegisterAccount,
    Unknown,
    ViewEquipped,
    JoinChatterChannels,
    KeepAliveOk,
};
