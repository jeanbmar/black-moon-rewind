if (require('electron-squirrel-startup')) return;
require('update-electron-app')();

const path = require('path');
const process = require('process');
const { app, BrowserWindow, ipcMain } = require('electron');

if (app.isPackaged) {
  process.env.NODE_ENV = 'production';
}
const Game = require('./game');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.setMenu(null);
  win.loadFile(path.join(__dirname, 'index.html'));
  win.once('ready-to-show', async () => {
    win.show();
  });
  win.on('show', async () => {
    if (Game.isUpdateAvailable()) {
      try {
        const download = await Game.createDownload();
        download.on('progress', (progress) => {
          win.webContents.send(
            'game:update-progress',
            Math.ceil(progress.percent * 100)
          );
        });
        win.webContents.send('game:update-started');
        await download.done();
        await Game.renameDownload();
        win.webContents.send('game:update-finished');
      } catch (error) {
        win.webContents.send('game:update-error', error.message);
      }
    }
  });
  ipcMain.handle('game:start', () => Game.start());
  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
