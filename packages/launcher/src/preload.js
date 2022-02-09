const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('game', {
    start: () => ipcRenderer.invoke('game:start'),
});
