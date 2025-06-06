document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
        window.close();
    });
});
