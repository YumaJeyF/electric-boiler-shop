import v from '../_vars.js';
import { createIconCountProducts } from './helper.js';

export const navigation = () => {
    const { burgerBtnOpen, body, popupBurger, burgerMenu, nameCity, LS } = v;

    // Определение местоположения пользователя

    window.addEventListener('DOMContentLoaded', () => {
        const options = { enableHighAccuracy: true, timeout: 5000 }

        const success = async (pos) => {
            const crd = pos.coords;

            const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&lang=ru&apiKey=8a721d4805c34256876cafd7571dfdc0`
        
            const response = await fetch(url);

            if (response.ok) {
                const result = await response.json();
                nameCity.forEach(name => name.innerHTML = result.features[0].properties.city);

            } else throw new Error(`Ошибка, статус ${response.status}`);
        }

        const error = () => { throw new Error('Отказано в доступе к местоположению'); }

        navigator.geolocation.getCurrentPosition(success, error, options);
    });

    // Бургер меню

    let timeOut;

    burgerBtnOpen.addEventListener('click', function() {

        if (this.classList.contains('burger__btn--btn-close')) closeBurgerMenu();
        else {
            popupBurger.classList.add('burger__container--visible');
            burgerMenu.classList.add('burger__menu--visible');
            
            timeOut = setTimeout(() => {
                this.classList.add('burger__btn--btn-close');
                this.firstElementChild.classList.add('burger__line-one--active');
                this.firstElementChild.nextElementSibling.classList.add('burger__line-two--active');
                this.lastElementChild.classList.add('burger__line-three--active');
            }, 390);

            body.style.position = 'fixed';
            body.style.top = -window.scrollY + 'px';
        }
    });

    function closeBurgerMenu() {
        clearTimeout(timeOut);
        popupBurger.classList.remove('burger__container--visible');
        burgerMenu.classList.remove('burger__menu--visible');

        burgerBtnOpen.classList.remove('burger__btn--btn-close');
        burgerBtnOpen.firstElementChild.classList.remove('burger__line-one--active');
        burgerBtnOpen.firstElementChild.nextElementSibling.classList.remove('burger__line-two--active');
        burgerBtnOpen.lastElementChild.classList.remove('burger__line-three--active');

        body.style.position = '';
        window.scrollTo(0, parseInt(body.style.top) * -1);
    }

    popupBurger.addEventListener('click', event => {
        if (!event.target.closest('.burger__menu')) closeBurgerMenu();;
    });

    window.addEventListener('keydown', event => {
        if (event.key === 'Escape' && popupBurger.classList.contains('burger__container--visible')) closeBurgerMenu();
    });

    if (LS.getItem('indexForCart')) {
        const data = JSON.parse(LS.getItem('indexForCart'));
        const { cartIcon } = v;

        const countProductsIcon = createIconCountProducts();
        
        if (data.length > 0) {
            countProductsIcon.innerHTML = data.length;
            cartIcon.append(countProductsIcon);
        }
    }
}