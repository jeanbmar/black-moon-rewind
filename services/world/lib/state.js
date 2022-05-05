const { Time } = require('@black-moon-rewind/common');
const database = require('@black-moon-rewind/database');
const { Character } = require('./models');

const time = new Time();
const characters = new Map();
const charactersByName = new Map();

const character = new Character();
// todo implement proper deserialization
const characterData = database.characters[0];
character.accountId = characterData.accountId;
character.id = characterData.id;
character.x = characterData.x;
character.y = characterData.y;
character.z = characterData.z;
character.items = characterData.items;
character.level = characterData.level;
character.name = characterData.name;
characters.set(character.id, character);
charactersByName.set(character.name, character);

module.exports = {
  time,
  characters,
  charactersByName,
};
