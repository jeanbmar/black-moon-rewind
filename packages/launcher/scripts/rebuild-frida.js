const path = require('path');
const { execSync } = require('child_process');
const process = require('process');

try {
    const fridaPath = require.resolve('frida');
    const moduleDir = path.dirname(fridaPath);
    execSync('npm run install', { cwd: moduleDir, stdio: 'inherit', env: process.env });
} catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
    }
}
