import v from './../_vars.js';

export function lightTheme() {

    v.preloadImages.forEach(image => {
        if (image.nextElementSibling && image.nextElementSibling.classList.contains('swiper-lazy-preloader-white')) {
            image.nextElementSibling.classList.remove('swiper-lazy-preloader-white');
        }
    });

    v.themes.forEach(theme => {
        theme.parentNode.classList.remove('theme--dark');
        theme.nextElementSibling.classList.remove('theme__moon--dark');
        theme.checked = false;
    });

    const products = document.querySelectorAll('.product__body');
    const prices = document.querySelectorAll('.product__price');
    const names = document.querySelectorAll('.product__name')   

    products.forEach(product => product.style.background =  '');
    prices.forEach(price => price.style.color = '#2d2d2d');
    names.forEach(name => name.style.color = '');

    const changeTextColor = document.querySelectorAll('[data-change-view]');

    changeTextColor.forEach(text => text.style.color = '');
    v.changeIcons.forEach(icon => icon.style.fill = '');
    v.accSvg.forEach(icon => icon.style.stroke = '');

    v.body.style.background = '';
    v.search.style.background = '';
    v.navBottom.style.background = '';
    v.burgerBtnLines.forEach(btn => btn.style.background = '#2d2d2d');
    v.burgerMenu.style.background = '';
    v.mainBlocks.forEach(block => block.style.backgroundColor = '');
    v.companySlides.forEach(slide => slide.style.background = '');
    if (v.productInfBody) v.productInfBody.style.background = '';

    if (v.productsCartInf) {
        v.productsCartInf.style.background = '';
        v.resultBody.style.background = '';
        v.cartHiddenMenu.style.background = '';
    }

    if (v.iconStroke.length > 0) v.iconStroke.forEach(icon => icon.style.stroke = '');
    
    v.btnClear.classList.remove('search__btn-clear--dark-theme');
    v.searchIcons.forEach(icon => {
        if (!icon.classList.contains('search__icon--active')) icon.style.fill = '#4E4C4C';
        else icon.style.fill = '#1c629e';
    });
    v.nameCity.forEach(name => {
        if (name.id === 'mobile-name-city') name.classList.remove('nav-top__city--active');
    });
}