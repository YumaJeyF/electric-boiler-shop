import v from './../_vars.js';
import { getProducts } from './get_data_products.js';
import { createProductPage } from './create_card_product.js';
import { iconAppearanceOnHover } from './icon_appearence_on_hover.js';

export function createfilter(brand, id) {
    return `
    <div class='current-filters__inf'>
        <p class='current-filters__text'>${brand}</p>
        <span class='current-filters__btn-close' data-id='${id}'></span>
    </div>
    `
}

export async function testInputValue(value) {
    const reg = new RegExp(value.trim(), 'i');

    const data = await getProducts();
    const pagesInf = data.products;

    return pagesInf.filter(item => reg.test(item.name));
}

export async function filterProducts() {

    const { filtersBoilers, filtersSpareParts, catalogProducts, searchField } = v;

    const activeFiltersBoilers = [...filtersBoilers].filter(filter => filter.previousElementSibling.checked);
    const activeFiltersSpareParts = [...filtersSpareParts].filter(filter => filter.previousElementSibling.checked);

    const productsData = await testInputValue(searchField.value);

    const newData = [];

    if (productsData.length > 0) {
        if (activeFiltersBoilers.length > 0) {
            if (!catalogProducts.classList.contains('_filters')) catalogProducts.classList.add('_filters');
    
            if (newData.length <= 0) {
                activeFiltersBoilers.forEach(filterB => {
                    productsData.forEach(data => {
                        if (filterB.innerHTML == data.manufacturer && !newData.includes(data)) newData.push(data);
                    });
                });
            }
        }
    
        const newArr = [];
    
        if (activeFiltersSpareParts.length > 0) {
            if (newData.length <= 0) {
                if (!catalogProducts.classList.contains('_filters')) catalogProducts.classList.add('_filters');
                activeFiltersSpareParts.forEach(filterS => {
                    productsData.forEach(data => {
                        if (filterS.innerHTML == data.spareParts && !newData.includes(data)) newData.push(data);
                    });
                });
            } else  {
                if (catalogProducts.classList.contains('_filters')) catalogProducts.classList.remove('_filters');
    
                activeFiltersSpareParts.forEach(filterS => {
                    newData.forEach(data => {
                        if (filterS.innerHTML == data.spareParts && !newArr.includes(data)) newArr.push(data);
                    });
                });
            }
        }
    
        if (catalogProducts.classList.contains('_filters')) return newData;
        else return newArr;
    }
}

export async function sortOnPrice(productsInf) {
    const { priceStart, priceEnd, searchField } = v;
    const start = +priceStart.value;
    const end = +priceEnd.value;

    if (productsInf && productsInf.length > 0) {
        const resultData = productsInf.filter(inf => {
            if (+inf.price >= start && +inf.price <= end) return inf;
        });

        return resultData;
    } else {
        const data = await testInputValue(searchField.value);

        const newData = data.filter(inf => {
            if (+inf.price >= start && +inf.price <= end) return inf;
        });

        return newData;
    }
}

export function removeFiltersActive() {
    const { filtersBoilers, filtersSpareParts, LS } = v;
    if (LS.getItem('filters')) {
        LS.removeItem('filters');
        filtersBoilers.forEach(filter => {
            if (filter.previousElementSibling.checked) filter.previousElementSibling.checked = false;
        });

        filtersSpareParts.forEach(filter => {
            if (filter.previousElementSibling.checked) filter.previousElementSibling.checked = false;
        });

        const filtersHeaders = document.querySelectorAll('.current-filters__inf');

        if (filtersHeaders.length > 0) filtersHeaders.forEach(filter => filter.remove());
    }
}

async function newDataForSorting(value) {
    const reg = new RegExp(value.trim(), 'i');
    const { LS } = v;


    const data = await getProducts();
    const pages = data.products;

    if (LS.getItem('filters')) return sortOnPrice(await filterProducts());
    else return pages.filter(item => reg.test(item.name));
}

export async function sortPrice(option) {
    const { searchField } = v;

    const pagesWithData = await newDataForSorting(searchField.value);

    let sortPrices = [];
    let defPrices  = [];

    pagesWithData.forEach(page => {
        defPrices.push(page.price);
        sortPrices.push(page.price);
    });

    let resultProducts = [];

    sortPrices.sort(option); // toSort

    for (const def in defPrices) {
        for (const sort in sortPrices) {
            if (defPrices[def] == sortPrices[sort]) resultProducts[sort] = pagesWithData[def];
        }
    }

    return resultProducts;
}

function changeForProducts() {
    const products = document.querySelectorAll('.product__body');
    const prices = document.querySelectorAll('.product__price');
    const names = document.querySelectorAll('.product__name');
    const catalogError = document.querySelector('.catalog-products__error');

    const { mainGr, wh, LS } = v;

    if (LS.getItem('colorTheme')) {
        if (LS.getItem('colorTheme') == 'light') {
            products.forEach(product => product.style.background =  '');
            prices.forEach(price => price.style.color = '');
            names.forEach(name => name.style.color = '');

            if (catalogError) catalogError.style.color = '';

        } else {
            products.forEach(product => product.style.background =  mainGr);
            prices.forEach(price => price.style.color = wh);
            names.forEach(name => name.style.color = wh);

            if (catalogError) catalogError.style.color = wh;
        }
    }
}

export function displayList(pages, countProducts, currentPage, containerProducts) {
    const { options, LS } = v;
    currentPage--;
    containerProducts.innerHTML = '';

    const start = countProducts * currentPage;
    const end = start + countProducts;

    const pagData = pages.slice(start, end);

    if (pagData.length > 0 && pages.length > 0) {
        pagData.forEach(page => {
            const price = new Intl.NumberFormat('ru-RU', options).format(page.price);
            const product = createProductPage(page.id, page.name, page.article, price, page.manufacturer, page.spareParts, page.url);
           
            if (!containerProducts.classList.contains('catalog-products__body')) {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                if (containerProducts.classList.contains('liked-it__swiper-wrapper')) swiperSlide.classList.add('like-it__swiper-slide');

                swiperSlide.innerHTML = product;

                containerProducts.append(swiperSlide);
            } else {
                containerProducts.innerHTML += product;
            }
            
        });
    } else if (pages.length <= 0 && containerProducts.classList.contains('catalog-products__body')) {
        containerProducts.innerHTML = `
        <p class='catalog-products__error' data-change-view>Товара нет</p>
        `
    }

    // Динамическое изменение расцветки карточек с продуктами в зависимости от темы
    changeForProducts();

    const products = document.querySelectorAll('.product');

    products.forEach(product => product.addEventListener('click', function() {
        const id = this.dataset.productId - 1;
        LS.setItem('productId', id);
    }));
}

function createDotsForPagination() {
    return `
    <div class="pagination__dots">
        <span class="pagination__line"></span>
        <span class="pagination__hidden-btns">...</span>
        <span class="pagination__line"></span>
    </div>
    `
}

function displayPaginationBtn(i) {
    const btnEl = document.createElement('span');
    btnEl.classList.add('pagination__btn');
    btnEl.innerHTML = i;

    if (i == 1) {
        btnEl.classList.add('pagination__btn--active');
        btnEl.classList.add('pagination__btn--first');
    }

    return btnEl;
}

export function clickOnBtnPag(productsData, countProducts) {
    const btnsEl = document.querySelectorAll('.pagination__btn');
    const dots = document.querySelector('.pagination__dots');
    const { catalogProducts, LS } = v;

    btnsEl.forEach(btnEl => btnEl.addEventListener('click', function() {

        btnsEl.forEach(btn => {
            if (btn.classList.contains('pagination__btn--active')) btn.classList.remove('pagination__btn--active');
        });
        this.classList.add('pagination__btn--active');
        
        displayList(productsData, countProducts, this.innerHTML, catalogProducts);

        iconAppearanceOnHover();

        // Для левых кнопок пагинации

        if (+this.innerHTML + 2 <= +dots.nextElementSibling.innerHTML && this.previousElementSibling) {
            this.previousElementSibling.innerHTML = +this.innerHTML++;
            this.previousElementSibling.classList.add('pagination__btn--active');
            
            this.classList.remove('pagination__btn--active');
            this.innerHTML = +this.innerHTML--;
        }

        if (!this.previousElementSibling && this.innerHTML != 1) {
            this.innerHTML = +this.innerHTML - 1;
            this.classList.remove('pagination__btn--active');

            this.nextElementSibling.innerHTML = +this.nextElementSibling.innerHTML - 1;
            this.nextElementSibling.classList.add('pagination__btn--active');
        }

        // Для правых кнопок пагинации
        
        if (this.nextElementSibling&& +this.innerHTML - 2 > +dots.previousElementSibling.innerHTML && this.previousElementSibling == dots) {
            this.innerHTML = +this.innerHTML - 1;
            this.classList.remove('pagination__btn--active');
            this.nextElementSibling.innerHTML = +this.nextElementSibling.innerHTML - 1;
            this.nextElementSibling.classList.add('pagination__btn--active');
        }

        if (LS.getItem('numbersPages')) {
            const numbers = LS.getItem('numbersPages');
            if (!this.nextElementSibling && numbers && +this.innerHTML != numbers ) {
                this.previousElementSibling.innerHTML = +this.previousElementSibling.innerHTML + 1;
                this.previousElementSibling.classList.add('pagination__btn--active');

                this.classList.remove('pagination__btn--active');
                this.innerHTML = +this.innerHTML + 1;
            }
        }
            
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
}

export function displayPagination(pages, countProducts) {
    const countPages = Math.ceil(pages.length / countProducts);
    const { LS, pagination } = v;

    if (!LS.getItem('numbersPages')) LS.setItem('numbersPages', countPages);

    for (let i = 0; i < countPages; i++) {
        const btnEl = displayPaginationBtn(i + 1);

        if (i <= 1 || i + 2 >= countPages && countPages > 3) {
            pagination.append(btnEl);
        } else if (countPages <= 3) {
            pagination.append(btnEl);
        }

        if (i == 1) {
            const dots = createDotsForPagination();
            pagination.innerHTML += dots;
        }
    }
    clickOnBtnPag(pages, countProducts);
}

export const changeColorText = () => {
    const textsInf = document.querySelectorAll('.tabs__text');
    const { wh, LS } = v;
    if (LS.getItem('colorTheme')) {
        if (LS.getItem('colorTheme') == 'light') textsInf.forEach(text => text.style.color = '');
        else textsInf.forEach(text => text.style.color = wh);
    }
}

export function accordeonCart(btn) {
    const content = btn.parentNode.nextElementSibling;
    const mark = document.querySelector(btn.dataset.edit);
    const { btnConfirm, resultInput, LS } = v;

    if (!content.classList.contains('your-products__hidden-menu--hidden')) {
        content.classList.add('your-products__hidden-menu--hidden');
        mark.classList.remove('your-products__check-mark--hidden');
        content.style.maxHeight = 0;

        LS.setItem('hiddenMenu', 'hidden');
    } 
    else {
        content.classList.remove('your-products__hidden-menu--hidden');
        content.style.maxHeight = content.scrollHeight + 'px';
        mark.classList.add('your-products__check-mark--hidden');
        LS.removeItem('hiddenMenu', 'hidden');
        
        if (!btnConfirm.classList.contains('result__btn-confirm--disable') && resultInput.checked) {
            btnConfirm.classList.add('result__btn-confirm--disable');
            resultInput.checked = false;
        }
    }
}

export function changeThemeCart() {
    const changeTexts = document.querySelectorAll('[data-change-inf-product]');
    const { LS, wh } = v;

    if (LS.getItem('colorTheme')) {
        if (LS.getItem('colorTheme') == 'light') changeTexts.forEach(text => text.style.color = '');
        else changeTexts.forEach(text => text.style.color = wh);
    }
}

export function createCartEmpty() {
    return `
    <p class='products-list__hidden-list-products'>
    Корзина пуста
    </p>
    `
}

export function countTotalSum(options) {
    const { resultsSum } = v;
    const allProductPrice = document.querySelectorAll('[data-cart-price]');
    let totalPrice = 0;

    allProductPrice.forEach(price => totalPrice += +price.innerHTML.replace(/\D/g, ''));
    resultsSum.forEach(resultSum => resultSum.innerHTML =  new Intl.NumberFormat('ru-RU', options).format(totalPrice));
}

export function removeProduct(btn, options) {
    const { resultsSum, countProducts, LS, productsList } = v;
    if (btn.closest('.products-list__product')) {
        const indexProduct = btn.dataset.cartBtn;
        const priceNowProduct = document.querySelector(`[data-cart-price='${indexProduct}']`);
        const activeIconWithCountProducts = document.querySelector('.right-btns__count-products');

        if (activeIconWithCountProducts.innerHTML > 0) activeIconWithCountProducts.innerHTML--;
        if (activeIconWithCountProducts.innerHTML == 0) activeIconWithCountProducts.remove();

        resultsSum.forEach(resultSum => resultSum.innerHTML = new Intl.NumberFormat('ru-RU', options)
            .format(+resultSum.innerHTML.replace(/\D/g, '') - +priceNowProduct.innerHTML.replace(/\D/g, '')));

        countProducts.innerHTML--;
        btn.closest('.products-list__product').remove();

        if (LS.getItem('indexForCart')) {
            const data = JSON.parse(LS.getItem('indexForCart'));

            data.forEach(el => {
                if (el == indexProduct) {
                    const indexEl = data.indexOf(el);
                    data.splice(indexEl, 1);
                    LS.setItem('indexForCart', JSON.stringify(data));
                }
            });
        }

        if (LS.getItem('btnClicked')) {
            const value = LS.getItem('btnClicked');
            const id = value.slice(8);

            if (id == indexProduct) LS.removeItem('btnClicked');
        }

        if (LS.getItem('saveCountProduct')) {
            const data = JSON.parse(LS.getItem('saveCountProduct'));

            for (const key in data) {
                const indexEl = key.slice(0, 1);

                if (indexProduct == indexEl) {
                    delete data[key];
                    LS.setItem('saveCountProduct', JSON.stringify(data));
                }
            }
        }

        const productsForRemove = document.querySelectorAll('.products-list__product');
        if (productsForRemove.length <= 0) productsList.innerHTML = createCartEmpty();
    }
}

export function createIconCountProducts() {
    const countProductsIcon = document.createElement('span');
    countProductsIcon.classList.add('right-btns__count-products');
    countProductsIcon.innerHTML = 1;

    return countProductsIcon;
}

export const workIndexForCart = (productId) => {
    const { LS } = v;
    const saveIndexProductsForCart = [];

    if (LS.getItem('indexForCart')) {
        const saveIndex = JSON.parse(LS.getItem('indexForCart'));

        if (!saveIndex.includes(productId)) saveIndex.push(productId);
        else return false;
        LS.setItem('indexForCart', JSON.stringify(saveIndex));
    } else {
       saveIndexProductsForCart.push(productId);
       LS.setItem('indexForCart', JSON.stringify(saveIndexProductsForCart));
    }
}

export function addToCart(productId) {

    const product = document.querySelector(`[data-product-id="${productId + 1}"]`);

    let productImg;

    if (product) productImg = product.querySelector('.product__image');
    else {
        const { sliderFirst } = v;
        productImg = sliderFirst.querySelector('.swiper-slide-active > .swiper-first__pic > .swiper-first__img');
    }

    const { cart, body } = v;

    if (productImg) {
        const flyImg = productImg.cloneNode();

        // Ширина и высота картинки

        const flyImgWidth = productImg.offsetWidth;
        const flyImgHeight = productImg.offsetHeight;

        // Позиционирование картинки

        const flyImgTop = productImg.getBoundingClientRect().top;
        const flyImgLeft = productImg.getBoundingClientRect().left;

        if (!flyImg.classList.contains('product__image--fly') && flyImg.classList.contains('product__image')) flyImg.classList.add('product__image--fly');
        if (flyImg.classList.contains('swiper-first__img')) flyImg.classList.add('swiper-first__img--fly');

        flyImg.style.cssText = `
        width: ${flyImgWidth}px;
        height: ${flyImgHeight}px;
        top: ${flyImgTop}px;
        left: ${flyImgLeft}px;
        `

        body.append(flyImg);

        // Позиционирование иконки корзины

        const cartLeft = cart.getBoundingClientRect().left;
        const cartTop = cart.getBoundingClientRect().top;

        flyImg.style.cssText = `
        top: ${cartTop}px;
        left: ${cartLeft}px;
        width: 0px;
        height: 0px;
        opacity: 0;
        `

        flyImg.addEventListener('transitionend', e => {
            if (e.propertyName == 'opacity') {
                flyImg.remove();
                updateCart(true);
            }
        });
    }
}

function updateCart(productAdd) {
    const cartQuantity = document.querySelector('.right-btns__count-products');
    const countProductsIcon = createIconCountProducts();
    const { cartIcon } = v;

    if (productAdd) {
        if (cartQuantity) cartQuantity.innerHTML = ++cartQuantity.innerHTML;
        else cartIcon.append(countProductsIcon);
    }
}

export function createSlideSwiper(linkImg, numberSlider) {
    return `
    <div class='swiper-slide'>
        <div class='swiper-${numberSlider}__pic'>
            <img src='${linkImg}' class='swiper-${numberSlider}__img'>
        </div>
    </div>
    `
}

export function countPages() {
    let count;

    const windowWidth = window.innerWidth;

    if (windowWidth > 768) count = 32;
    if (windowWidth <= 768) count = 18;
    
    return count;
}

export function addFilterProduct(newPagesInf, countProducts) {
    const { catalogProducts, pagination } = v;
    if (newPagesInf.length >= countProducts) {
        displayList(newPagesInf, countProducts, 1, catalogProducts);
        displayPagination(newPagesInf, countProducts)
    }
    else {
        displayList(newPagesInf, newPagesInf.length, 1, catalogProducts);
        pagination.innerHTML = '';
    }
}