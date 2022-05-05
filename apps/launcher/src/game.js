const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const FridaClient = require('@reultra/frida-client');

const script = require.resolve('../lib/memory-agent');
const Download = require('./download');

const {
  gameExePath,
  gameDebug,
  gameIp,
  gamePc,
  gameUid,
  gamePwd,
  gameRootDir,
  gameDir,
  gameTmpDir,
  updateGameUrl,
} = require('../app.config');

class Game {
  static isUpdateAvailable() {
    return !fs.existsSync(gameDir);
  }

  static async createDownload() {
    await fsp.rm(gameRootDir, { recursive: true, force: true });
    await fsp.mkdir(gameRootDir, { recursive: true });
    return new Download({ url: updateGameUrl, path: gameRootDir });
  }

  static async renameDownload() {
    await fsp.rename(gameTmpDir, gameDir);
  }

  static async start() {
    const packageOptions =
      `-uid=${gameUid} -pwd=${gamePwd} -ip=${gameIp} -pc=${gamePc}`.split(' ');
    const client = new FridaClient();
    if (process.env.NODE_ENV === 'development') {
      client.on('info', console.log);
      client.on('stdout', (message) => process.stdout.write(message));
      client.on('error', console.error);
      if (gameDebug) {
        packageOptions.push('-debug');
      }
    }
    await client.connect({
      script,
      packageName: gameExePath,
      packageOptions,
      cwd: path.dirname(gameExePath),
      env: process.env,
    });
  }
}

module.exports = Game;
