const Character = require('./models/character');
const { World } = require('./models');
const database = require('../database-mock');

const sessions = new Map();
const world = new World();
const characters = new Map();

const character = new Character();
// todo implement proper deserialization
const characterData = database.characters[0];
character.id = characterData.id;
character.x = characterData.x;
character.y = characterData.y;
character.z = characterData.z;
character.items = characterData.items;
character.level = characterData.level;
character.name = characterData.name;
characters.set(character.id, character);

module.exports = {
  world,
  characters,
  sessions,
};
