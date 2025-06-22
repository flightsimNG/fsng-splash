const { app, BrowserWindow, ipcMain } = require('electron');
const os = require('os');

const platform = os.type();
const release = os.release();
const electronVersion = process.versions.electron;
const appVersion = app.getVersion();

const userAgent = `fsNG/${appVersion} (${platform} ${release}; Electron ${electronVersion})`;

let mainWindow;
let preventClose = false; // Deprecated however could reintroduce

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1068,
        height: 768,
        resizable: false,
        minimizable: false,
        maximizable: false,
        center: true,
        icon: './assets/favicon.ico',
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            userAgent: userAgent
        }
    });
    
    mainWindow.loadFile('index.html')
        .catch(err => console.error('Failed to load index.html', err));

    let devToolsToggleCount = 0;
    let lastToggleTime = 0;

    mainWindow.webContents.on('before-input-event', (event, input) => {
        const isDevToolsCombo = input.control && input.shift && input.key.toLowerCase() === 'i' && input.type === 'keyDown';

        if (isDevToolsCombo) {
            const currentTime = Date.now();
            const timeDiff = currentTime - lastToggleTime;

            if (timeDiff < 600) {
                devToolsToggleCount++;
            } else {
                devToolsToggleCount = 1;
            }

            lastToggleTime = currentTime;
            event.preventDefault();

            if (devToolsToggleCount === 2) {
                mainWindow.webContents.openDevTools({ mode: 'detach' });
                devToolsToggleCount = 0;
            }
        }
    });
}

function createPopup() {
    const popup = new BrowserWindow({
        width: 397,
        height: 561,
        resizable: false,
        minimizable: false,
        maximizable: false,
        frame: true,
        icon: './assets/favicon.ico',
        title: 'Sign into fsNG • Hengill ID',
        autoHideMenuBar: true,
        parent: mainWindow,
        modal: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    popup.once('ready-to-show', () => popup.show());
    popup.loadFile('assets/login-host.html')
        .catch(err => console.error('Failed to load popup', err));
}

app.whenReady().then(() => {
    createWindow();

    
    ipcMain.on('open-login-popup', () => {
        createPopup();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
