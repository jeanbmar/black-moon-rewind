if (require('electron-squirrel-startup')) return;
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const Game = require('./game');

function createWindow () {
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
    win.once('ready-to-show', () => {
        win.show();
    });
    ipcMain.handle('game:start', () => Game.start());
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});
