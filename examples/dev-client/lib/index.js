const path = require('path');
const FridaClient = require('@blackmoon-rewinded/frida-client');
const script = require.resolve('@blackmoon-rewinded/frida-agent');

const {
    BMC_GAME_DEBUG,
    BMC_GAME_EXE_PATH,
    BMC_GAME_IP,
    BMC_GAME_PC,
    BMC_GAME_PWD,
    BMC_GAME_UID,
} = process.env;

let packageOptions = `-uid=${BMC_GAME_UID} -pwd=${BMC_GAME_PWD} -ip=${BMC_GAME_IP} -pc=${BMC_GAME_PC}`;
if (BMC_GAME_DEBUG === 'true') {
    packageOptions = `-debug ${packageOptions}`;
}

(async () => {
    try {
        const client = new FridaClient();
        client.on('info', console.log);
        client.on('message', console.log);
        client.on('error', console.error);
        await client.connect({
            script,
            packageName: BMC_GAME_EXE_PATH,
            packageOptions,
            cwd: path.dirname(BMC_GAME_EXE_PATH),
        });
    } catch (error) {
        console.error(error);
    }
})();
