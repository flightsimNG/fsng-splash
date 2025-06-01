const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1068,
        height: 768,
        resizable: false,
        minimizable: false,
        maximizable: false,
        center: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html')
        .catch(err => console.error('Failed to load index.html', err));

    win.webContents.on('devtools-opened', () => {
        win.webContents.closeDevTools();
    });
    win.webContents.on('before-input-event', (event, input) => {
        if ((input.control || input.meta) && input.key.toLowerCase() === 'i' && input.type === 'keyDown') {
            event.preventDefault();
        }
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
