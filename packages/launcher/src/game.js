const path = require('path');
const script = require.resolve('@black-moon-rewind/frida-agent');
const FridaClient = require('@black-moon-rewind/frida-client');

const {
    BMC_GAME_DEBUG = 'false',
    BMC_GAME_EXE_PATH = path.resolve(__dirname, 'game.exe'),
    BMC_GAME_IP = '127.0.0.1',
    BMC_GAME_PC = 'demo',
    BMC_GAME_PWD = 'demo',
    BMC_GAME_UID = 'demo',
} = process.env;

class Game {
    static async start() {
        const packageOptions = `-uid=${BMC_GAME_UID} -pwd=${BMC_GAME_PWD} -ip=${BMC_GAME_IP} -pc=${BMC_GAME_PC}`.split(' ');
        if (BMC_GAME_DEBUG === 'true') {
            packageOptions.push('-debug');
        }
        const client = new FridaClient();
        await client.connect({
            script,
            packageName: BMC_GAME_EXE_PATH,
            packageOptions,
            cwd: path.dirname(BMC_GAME_EXE_PATH),
        });
    }
}

module.exports = Game;
