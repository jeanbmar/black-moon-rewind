const AuthenticateServerVersion = require('./authenticate-server-version');
const EnterGame = require('./enter-game');
const ExitGame = require('./exit-game');
const GetCharacterList = require('./get-character-list');
const GetExtendedEntityInformation = require('./get-extended-entity-information');
const GetSpellList = require('./get-spell-list');
const LoadCharacter = require('./load-character');
const QueryUnitExistence = require('./query-unit-existence');
const RegisterAccount = require('./register-account');
const Unknown = require('./unknown');
const ViewEquipped = require('./view-equipped');
const JoinChatterChannels = require('./join-chatter-channels');

module.exports = {
    AuthenticateServerVersion,
    EnterGame,
    ExitGame,
    GetCharacterList,
    GetExtendedEntityInformation,
    GetSpellList,
    LoadCharacter,
    QueryUnitExistence,
    RegisterAccount,
    Unknown,
    ViewEquipped,
    JoinChatterChannels,
};
