const btn = document.querySelector('.j-btn-change');
const icon01 = document.querySelector('.btn_icon_01');
const icon02 = document.querySelector('.btn_icon_02'); 

btn.addEventListener('click', () => {
    console.log(window.innerHeight, window.innerWidth, 'window.innerHeight');
    console.log(document.documentElement.clientHeight, document.documentElement.clientWidth, 'documentElement');
    alert('Высота: ' + window.screen.height + ', Ширина: ' + window.screen.width);
    }
)