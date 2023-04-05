const btn = document.querySelector('.j-btn-change');
const icon01 = document.querySelector('.btn_icon_01');
const icon02 = document.querySelector('.btn_icon_02'); 

btn.addEventListener('click', () => {
    icon01.classList.toggle('invisible');
    icon02.classList.toggle('invisible');
    }
)