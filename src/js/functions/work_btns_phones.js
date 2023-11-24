import v from '../_vars.js';

export const workBtnsPhones = () => {
    const { btnsPhones } = v;

    if (window.innerWidth <= 926) {

        btnsPhones.forEach(btn => btn.addEventListener('click', () => {
            const numberTel = btn.lastElementChild;

            if (!numberTel.classList.contains('nav__phone-text--active')) numberTel.classList.add('nav__phone-text--active');
        
            window.addEventListener('click', e => {
                if (!e.target.closest('[data-phone]') && numberTel && numberTel.classList.contains('nav__phone-text--active')) numberTel.classList.remove('nav__phone-text--active');
            });  
        }));
    }
}