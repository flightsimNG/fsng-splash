const { ipcRenderer } = require('electron');
const progressStatus = document.getElementById('progressStatus')

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
        window.close()
    });
});

function signIn() {
    ipcRenderer.send('open-login-popup');
    progressStatus.innerHTML = 'signing in';
}

