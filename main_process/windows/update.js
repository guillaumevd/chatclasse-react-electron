const electron = require("electron");
const path = require("path");
const os = require("os");
let updateWindow = undefined;
const isDev = true;

function getWindow() {
    return updateWindow;
}

function destroyWindow() {
    if (!updateWindow) return;
    updateWindow.close();
    updateWindow = undefined;
}

function createWindow() {
    destroyWindow();
    updateWindow = new electron.BrowserWindow({
        title: "Mise à jour",
        width: 400,
        height: 500,
        resizable: false,
        transparent: os.platform() === 'win32',
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true
        },
    });
    updateWindow.webContents.openDevTools()
    electron.Menu.setApplicationMenu(null);
    updateWindow.setMenuBarVisibility(false);
    updateWindow.loadFile(
        isDev
          ? path.join(electron.app.getAppPath(), 'public', 'splash.html')
          : path.join(electron.app.getAppPath(), 'build', 'splash.html')
      )
    updateWindow.once('ready-to-show', () => {
        if (updateWindow) {
            updateWindow.show();
        }
    });
}

module.exports = {
    getWindow,
    createWindow,
    destroyWindow,
};