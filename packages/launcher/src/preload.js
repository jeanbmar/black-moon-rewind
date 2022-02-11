const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('game', {
  emit: (channel, data) => ipcRenderer.invoke(channel, data),
  on: (channel, listener) => ipcRenderer.on(channel, listener),
});
