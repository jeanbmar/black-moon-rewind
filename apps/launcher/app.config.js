const path = require('path');
const process = require('process');
require('dotenv').config();

const UPDATE_BASE_URL =
  'https://github.com/jeanbmar/black-moon-rewind/releases/download';

const resourcesPath = process.env.RESOURCES_PATH ?? process.resourcesPath;
const gameVersion = process.env.BMC_GAME_VERSION ?? '1.0.0';
const gameExePath =
  process.env.BMC_GAME_EXE_PATH ??
  path.resolve(resourcesPath, 'game', gameVersion, 'game.exe');
const gameRootDir = path.join(resourcesPath, 'game');
const gameTmpDir = path.join(
  gameRootDir,
  `black-moon-rewind-game-${gameVersion}`
);
const gameDir = path.join(gameRootDir, gameVersion);

module.exports = {
  resourcesPath,
  gameVersion,
  gameDebug: process.env.BMC_GAME_DEBUG === 'true',
  gameExePath,
  gameIp: process.env.BMC_GAME_IP ?? '37.59.53.7',
  gamePc: process.env.BMC_GAME_PC ?? 'Black Moon Rewind',
  gameUid: process.env.BMC_GAME_UID ?? 'demo',
  gamePwd: process.env.BMC_GAME_PWD ?? 'demo',
  gameRootDir,
  gameTmpDir,
  gameDir,
  updateGameUrl: `${UPDATE_BASE_URL}/game-${gameVersion}/black-moon-rewind-game-${gameVersion}.tar`,
};
