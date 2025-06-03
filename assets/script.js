// logic

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
        window.close();
    });
});

if (navigator.userAgent.includes('Gecko')) {
    console.log("Browser detected.");

    const popoutDiv = document.createElement('div');
    const popoutBtn = document.createElement('button');
    popoutBtn.textContent = 'Popout';
    popoutBtn.onclick = () => {
        window.open(
            window.location.href,
            '_blank',
            'width=1068,height=768'
        );
    };

    popoutDiv.appendChild(popoutBtn);
    document.body.appendChild(popoutDiv);
}

alert(navigator.userAgent)