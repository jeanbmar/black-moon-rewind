/* eslint-disable no-console */
const path = require('path');
const FridaClient = require('@reultra/frida-client');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const script = require.resolve('../lib/memory-agent');

const {
  BMC_GAME_DEBUG,
  BMC_GAME_EXE_PATH,
  BMC_GAME_IP,
  BMC_GAME_PC,
  BMC_GAME_PWD,
  BMC_GAME_UID,
} = process.env;

const packageOptions =
  `-uid=${BMC_GAME_UID} -pwd=${BMC_GAME_PWD} -ip=${BMC_GAME_IP} -pc=${BMC_GAME_PC}`.split(
    ' '
  );
if (BMC_GAME_DEBUG === 'true') {
  packageOptions.push('-debug');
}

(async () => {
  try {
    const client = new FridaClient();
    client.on('info', console.log);
    client.on('stdout', (message) => process.stdout.write(message));
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
