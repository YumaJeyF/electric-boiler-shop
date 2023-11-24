import v from './../_vars.js';

export function darkTheme() {

    const gr = '#e0d3d3';
    
    v.preloadImages.forEach(image => {
        if (image.nextElementSibling && image.nextElementSibling.classList.contains('swiper-lazy-preloader')) {
            image.nextElementSibling.classList.add('swiper-lazy-preloader-white');
        }
    })

    v.themes.forEach(theme => {
        theme.parentNode.classList.add('theme--dark');
        theme.nextElementSibling.classList.add('theme__moon--dark');
        theme.checked = true;
    });

    const products = document.querySelectorAll('.product__body');
    const prices = document.querySelectorAll('.product__price');
    const names = document.querySelectorAll('.product__name')   

    products.forEach(product => product.style.background =  v.mainGr);
    prices.forEach(price => price.style.color = v.wh);
    names.forEach(name => name.style.color = v.wh);


    const changeTextColor = document.querySelectorAll('[data-change-view]');

    changeTextColor.forEach(text => {
        text.style.color = v.wh;
    });
    v.changeIcons.forEach(icon => icon.style.fill = v.wh);
    v.accSvg.forEach(icon => icon.style.stroke = v.wh);

    v.body.style.background = 'rgb(44 38 38)';
    v.search.style.background = '#615f5f';
    v.navBottom.style.background = '#473f3f'
    v.burgerMenu.style.background = 'rgb(71 66 66)';
    v.burgerBtnLines.forEach(btn => btn.style.background = v.wh);
    v.companySlides.forEach(slide => slide.style.background = gr);
    v.mainBlocks.forEach(block => block.style.backgroundColor = v.mainGr);
    if (v.productInfBody) v.productInfBody.style.background = v.mainGr;

    if (v.productsCartInf) {
        v.productsCartInf.style.background = v.mainGr;
        v.resultBody.style.background = v.mainGr;
        v.cartHiddenMenu.style.background = v.mainGr;
    }

    if (v.iconStroke.length > 0) v.iconStroke.forEach(icon => icon.style.stroke = v.wh);

    v.btnClear.classList.add('search__btn-clear--dark-theme');
    v.nameCity.forEach(name => {
        if (name.id === 'mobile-name-city') name.classList.add('nav-top__city--active');
    });

    v.themes.forEach(theme => theme.parentNode.dataset.colorTheme = 'dark');
}