const { Character } = require('./models');
const database = require('../database-mock');

const chatterChannels = new Map();
const sessions = new Map();
const characters = new Map();

// todo manage getting channelByName

const character = new Character();
const characterData = database.characters[0];
character.id = characterData.id;
character.name = characterData.name;
characters.set(character.id, character);

module.exports = {
  characters,
  chatterChannels,
  sessions,
};
