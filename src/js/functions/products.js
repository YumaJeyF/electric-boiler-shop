import v from './../_vars.js'
import { sortPrice } from './helper.js';
import { iconAppearanceOnHover } from './icon_appearence_on_hover.js';
import { displayList } from './helper.js';
import Choices from 'choices.js';
import { clickOnBtnPag } from './helper.js';
import { countPages } from './helper.js';
import { testInputValue } from './helper.js';
import { filterProducts } from './helper.js';
import { sortOnPrice } from './helper.js';
import { addFilterProduct } from './helper.js';

export const workWithProductsPage = async () => {
    const { catalogProducts, options, LS, searchField } = v;

    if (!catalogProducts.classList.contains('catalog-products__body--loading')) catalogProducts.classList.add('catalog-products__body--loading');

    let currentPage = 1;
    const countProducts = countPages();

    await addPagesWithProduct(); 
    iconAppearanceOnHover();

    if (catalogProducts.classList.contains('catalog-products__body--loading')) catalogProducts.classList.remove('catalog-products__body--loading');

    // Функция для подгрузки карточек товара и пагинация
    // =================================================   

    async function addPagesWithProduct() {
        let pages;

        if (LS.getItem('filters') || LS.getItem('saveInputsPrice')) pages = await sortOnPrice(await filterProducts());
        else pages = await testInputValue(searchField.value);
    
        if (pages) addFilterProduct(pages, countProducts);
    }
    
    // =================================================

    const selects = document.querySelectorAll('.filters-third__dropdown');
    const choices = selects.forEach(select => new Choices(select, { searchEnabled: false }));

    selects.forEach(select => select.addEventListener('change', async (e) => {
        const sortValue = e.target.lastElementChild.innerHTML;
        const btnsPag = document.querySelectorAll('.pagination__btn');
        const btnPagFirst = document.querySelector('.pagination__btn--first');

        if (sortValue) {
            if (btnPagFirst && !btnPagFirst.classList.contains('pagination__btn--active')) {
                btnsPag.forEach(btn => {
                    if (btn.classList.contains('pagination__btn--active')) btn.classList.remove('pagination__btn--active');
                });

                btnPagFirst.classList.add('pagination__btn--active');
            } 

            if (btnsPag && btnsPag.length > 0) {
                btnsPag.forEach(btn => {
                    if (!btnPagFirst.classList.contains('pagination__btn--active')) btnPagFirst.classList.add('pagination__btn--active');
                    if (btnPagFirst.innerHTML != 1) {
                        btnPagFirst.innerHTML--;
                        btn.nextElementSibling.innerHTML--;
                    }
                });
            }

            if (sortValue == 'Сначала дешёвые') {
                const productsData = await sortPrice((a, b) => a - b);
                displayList(productsData, countProducts, currentPage, catalogProducts, options);
                clickOnBtnPag(productsData, countProducts);
                iconAppearanceOnHover();
            }

            if (sortValue == 'Дорогие') {
                const productsData = await sortPrice((a, b) => b - a);
                displayList(productsData, countProducts, currentPage, catalogProducts, options);
                clickOnBtnPag(productsData, countProducts);
                iconAppearanceOnHover();
            }

            if (sortValue == 'Все') {
                const pages = await testInputValue(searchField.value);
                displayList(pages, countProducts, currentPage, catalogProducts, options);
                clickOnBtnPag(pages, countProducts);
                iconAppearanceOnHover();
            }
        }
    }));
}