let v;

export default v = {
    body: document.querySelector('body'),
    container: document.querySelector('.container'),
    themes: document.querySelectorAll('.theme__input'),
    navBottom: document.querySelector('.nav-bottom__body'),

    search: document.querySelector('.search'),
    searchField: document.querySelector('.search__input'),
    btnClear: document.querySelector('.search__btn-clear'),
    searchIcons: document.querySelectorAll('.search__icon'),

    btnsIcon: document.querySelectorAll('.right-btns__icon'),
    btnText: document.querySelector('.right-btns__text'),

    burgerBtnLines: document.querySelectorAll('#line'),
    burgerMenu: document.querySelector('.burger__menu'),
    navLinks: document.querySelectorAll('.navigation__link--mobile'),

    phoneIcon: document.querySelector('.right-btns__phone-icon'),

    burgerBtnOpen: document.querySelector('[data-burger-btn="open"]'),
    popupBurger: document.querySelector('.burger__container'),
    burgerMenu: document.querySelector('.burger__menu'),

    titlesMobile: document.querySelectorAll('.footer__title--mobile-main'),
    nameCity: document.querySelectorAll('.nav-top__city'),
    colorMarks: document.querySelectorAll('.nav-top__color-mark'),

    btnsCloseFilters: document.querySelectorAll('.current-filters__btn-close'),
    btnDeleteAllFilters: document.querySelector('.filters-third__delete-filters'),
    companySlides: document.querySelectorAll('.company-logos__slide'),

    changeIcons: document.querySelectorAll('[data-change-icon]'),
    preloadImages: document.querySelectorAll('.product__image'),
    accordeonTitles: document.querySelectorAll('[data-acc-desktop]'),

    filtersBoilers: document.querySelectorAll(`[data-label="boilers"]`),
    filtersSpareParts: document.querySelectorAll(`[data-label="spare-parts"]`),

    manufacturer: document.querySelector('.current-filters__manufacturer'),
    spareParts: document.querySelector('.current-filters__spare-parts'),
    btnsShow: document.querySelectorAll('.filters__btn-show'),
    btnsThrowFilter: document.querySelectorAll('[data-btn-throw-filters]'),
    
    filters: document.querySelectorAll('.accordeon__label'),
    btnsAllValue: document.querySelectorAll('.accordeon__select'),
    inputsChange: document.querySelectorAll('.product-price__inp'),
    catalogProducts: document.querySelector('.catalog-products__body'),

    mainBlocks: document.querySelectorAll('[data-main-change-back]'),
    accSvg: document.querySelectorAll('.accordeon__svg'),
    btnsSecThrow: document.querySelectorAll('[data-sec-throw]'),
    popup: document.querySelector('.filters-container'),
    dots: document.querySelector('.pagination__dots'),

    productTitles: document.querySelectorAll('[data-product-title]'),
    productsPrice: document.querySelectorAll('.description__price'),
    descriptionWarehouses: document.querySelectorAll('.description__warehouse'),
    articles: document.querySelectorAll('.description__article'),
    blocksInf: document.querySelectorAll('[data-description]'),
    blocksCompatibility: document.querySelectorAll('[data-compatibility]'),
    productInfBody: document.querySelector('.product-inf__body'),
    cart: document.querySelector('.right-btns__basket'),
    cartIcon: document.querySelector('.right-btns__basket-icon'),
    productsList: document.querySelector('.products-list'),
    resultsSum: document.querySelectorAll('[data-result-sum]'),
    countProducts: document.querySelector('.result__count-products > span'),
    btnConfirm: document.querySelector('.result__btn-confirm'),
    btnProductEdit: document.querySelector('.your-products__edit'),
    btnContinue: document.querySelector('.your-products__btn-continue'),
    resultLabel: document.querySelector('.result__label'),
    resultInput: document.querySelector('.result__agree-input'),

    productsCartInf: document.querySelector('.your-products__cart'),
    resultBody: document.querySelector('.result__body'),
    cartHiddenMenu: document.querySelector('.your-products__hidden-menu'),
    iconStroke: document.querySelectorAll('[data-change-stroke-icon]'),
    resultError: document.querySelector('.result__error'),
    btnsPhones: document.querySelectorAll('[data-phone]'),
    allSwipersWrappers: document.querySelectorAll('.swiper-wrapper'),
    swipersWrappersProductsInf: document.querySelectorAll('.product-inf__swiper-wrapper'),

    sliderFirst: document.querySelector('.swiper-first'),
    sliderSecond: document.querySelector('.swiper-second'),

    searchBtnFind: document.querySelector('.search__btn'),
    searchDropdown: document.querySelector('.search__dropdown-menu'),
    pagination: document.querySelector('.pagination'),
    search: document.querySelector('.search'),
    formFields: document.querySelectorAll('.form-main__field'),
    priceStart: document.querySelector('[name="price-start"]'),
    priceEnd: document.querySelector('[name="price-end"]'),
    formLoad: document.querySelector('.wholesale-form__load'),

    options: {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
    },

    mainGr: 'rgb(71 61 61)',
    wh: '#fff',
    LS: localStorage,
    red: '#E0595D',
    main: '#4E4C4C',
    blue: '#1C629E'
}