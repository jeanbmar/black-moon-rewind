const path = require('path');
const process = require('process');
const fs = require('fs/promises');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const { bundle } = require('@black-moon-rewind/np-bundle');
const { version } = require('./package.json');

module.exports = {
  outDir: 'g:/forge',
  packagerConfig: {
    icon: 'src/assets/favicon.ico',
    win32metadata: {
      FileDescription: 'Black Moon Rewind',
      ProductName: 'Black Moon Rewind',
    },
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'BlackMoonRewind',
        title: 'Black Moon Rewind',
        setupExe: `black-moon-rewind-${version}-setup.exe`,
        setupIcon: path.join(__dirname, 'src/assets/favicon.ico'),
        icon: path.join(__dirname, 'src/assets/favicon.ico'),
        iconUrl:
          'https://cdn.jsdelivr.net/gh/jeanbmar/black-moon-rewind/docs/icon.ico',
      },
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        authToken: process.env.GITHUB_TOKEN,
        repository: {
          owner: 'jeanbmar',
          name: 'black-moon-rewind',
        },
      },
    },
  ],
  hooks: {
    packageAfterCopy: async (forgeConfig, buildPath) => {
      await fs.rm(path.join(buildPath, '.env'));
      await fs.rm(path.join(buildPath, 'forge.config.js'));
      await bundle(__dirname, buildPath, {
        root: path.join(__dirname, '../..'),
      });
    },
  },
};
