const electron = require("electron");
const path = require("path");
const os = require("os");
let mainWindow = undefined;

const isDev = require('electron-is-dev');

function getWindow() {
    return mainWindow;
}

function destroyWindow() {
    if (!mainWindow) return;
    mainWindow.close();
    mainWindow = undefined;
}

function createWindow() {
    destroyWindow();
    mainWindow = new electron.BrowserWindow({
        title: "ChatClasse",
        width: 1280,
        height: 720,
        minWidth: 980,
        minHeight: 552,
        resizable: true,
        icon: path.join(electron.app.getAppPath(), 'build', 'assets', 'images', 'icon') + `.${os.platform() === "win32" ? "ico" : "png"}`,
        transparent: os.platform() === 'win32',
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true
        },
    });
    electron.Menu.setApplicationMenu(null);
    mainWindow.setMenuBarVisibility(false);
    if (isDev) {
        mainWindow.loadURL(`http://localhost:3000`);
    } else {
        mainWindow.loadFile(path.join(electron.app.getAppPath(), 'build', 'index.html'));
    }
    mainWindow.once('ready-to-show', () => {
        if (mainWindow) {
            mainWindow.show();
        }
    });
}

module.exports = {
    getWindow,
    createWindow,
    destroyWindow,
};