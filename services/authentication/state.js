const database = require('../database-mock');
const { Account, Character } = require('./models');

const sessions = new Map();
const accounts = new Map();
const characters = new Map();

const account = new Account();
const accountData = database.accounts[0];
account.id = accountData.id;
account.password = accountData.password;
accounts.set(account.id, account);

const character = new Character();
const characterData = database.characters[0];
character.accountId = characterData.accountId;
character.id = characterData.id;
character.name = characterData.name;
character.level = characterData.level;
characters.set(character.id, character);

module.exports = {
  accounts,
  sessions,
  characters,
};
