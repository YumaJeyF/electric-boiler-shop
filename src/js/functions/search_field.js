import v from '../_vars.js';
import { iconAppearanceOnHover } from './icon_appearence_on_hover.js';
import { testInputValue } from './helper.js';
import { countPages } from './helper.js';
import { removeFiltersActive } from './helper.js';
import { addFilterProduct } from './helper.js';

export const search = () => {
    const countProducts = countPages();

    const { LS, wh, searchField, btnClear, searchIcons, searchBtnFind, searchDropdown, catalogProducts, pagination, search } = v;

    searchField.addEventListener('click', workWithOptionsSearchField);
    searchField.addEventListener('input', workWithOptionsSearchField);

    btnClear.addEventListener('click', () => {
        if (searchField.value != '') {
            searchField.value = ''; 
            displayOptions();
        }
    });

    searchBtnFind.addEventListener('click', () => {
        findProducts(searchField.value);
        removeFiltersActive();
        closeSearchField();
    });

    window.addEventListener('click', e => {
        if (!e.target.closest('.search')) closeSearchField();
    });

    window.addEventListener('keydown', e => {
        if (searchField.classList.contains('search__input--clicked')) {
            if (e.key == 'Enter' && searchField.value != '') {
                findProducts(searchField.value);
                removeFiltersActive();
                closeSearchField();      
            }

            if (e.key == 'Escape') closeSearchField();
        }
    });

    function closeSearchField() {
        if (searchField.classList.contains('search__input--clicked')) {
            searchField.classList.remove('search__input--clicked');
            btnClear.classList.remove('search__btn-clear--open');
            search.classList.remove('search--dropdown-open');
            btnClear.nextElementSibling.classList.remove('search__btn--open');
            searchIcons.forEach(icon => icon.classList.remove('search__icon--active'));

            if (searchDropdown.classList.contains('search__dropdown-menu--open')) searchDropdown.classList.remove('search__dropdown-menu--open')
        }
    }

    function workWithOptionsSearchField() {
        if (searchField.value != '') {
            displayOptions();
            searchField.classList.add('search__input--clicked');
            btnClear.classList.add('search__btn-clear--open');
            btnClear.nextElementSibling.classList.add('search__btn--open');
            searchIcons.forEach(icon => icon.classList.add('search__icon--active'));
        }
    }

    async function findProducts(value) {
        if (value != '') {
            const namePage = window.location.pathname.replace('/', '');

            if (namePage != 'catalog.html') window.location.pathname = '/catalog.html';

            LS.setItem('search-value', value);

            catalogProducts.innerHTML = '';
            if (!catalogProducts.classList.contains('catalog-products__body--loading')) catalogProducts.classList.add('catalog-products__body--loading');

            const newPagesInf = await testInputValue(value);
            if (catalogProducts.classList.contains('catalog-products__body--loading')) catalogProducts.classList.remove('catalog-products__body--loading');

            if (newPagesInf.length > 0) {
                pagination.innerHTML = '';

                addFilterProduct(newPagesInf, countProducts);
                iconAppearanceOnHover();
            } 
            else {
                catalogProducts.innerHTML = `
                <p class='catalog-products__error' data-change-view>По запросу "${value}" ничего не найдено</p>
                `
                changeColorErrorCatalog();
                catalogProducts.style.justifyItems = 'center';
                pagination.remove();
            }
        }

    }

    if (LS.getItem('search-value')) {
        const value = LS.getItem('search-value');
        searchField.value = value;
    }

    async function displayOptions() {
        if (searchField.value != '') {
            if (!searchField.classList.contains('search__input--clicked')) searchField.classList.add('search__input--clicked');

            const searchData = await testInputValue(searchField.value);

            let newDataNames = [];
    
            searchData.forEach(data => {
                if (!newDataNames.includes(data.name)) newDataNames.push(data.name);
            });
    
            const html = newDataNames.map(name =>  {
                const reg = new RegExp(searchField.value, 'gi');
    
                const nameProduct = name.toLowerCase().replace(reg, 
                    `<span class='search__hl'>${searchField.value.toLowerCase()}</span>`
                    )
    
                return `<li class='search__li'>${nameProduct}</li>`
            }).slice(0, 10).join('');
    
            searchDropdown.innerHTML = html;
            clickOnPoints();
    
            if (!searchDropdown.classList.contains('search__dropdown-menu--open') 
            && !search.classList.contains('search--dropdown-open') && html != '') {
                searchDropdown.classList.add('search__dropdown-menu--open');
                search.classList.add('search--dropdown-open');
            }
            else if (searchData.length <= 0) {
                searchDropdown.classList.remove('search__dropdown-menu--open');
                search.classList.remove('search--dropdown-open');
            }
        }
    }

    function clickOnPoints() {
        const points = document.querySelectorAll('.search__li');
        points.forEach(point => point.addEventListener('click', () => {
            findProducts(point.innerText);
            searchField.value = point.innerText;
            closeSearchField();
        }));
    }

    function changeColorErrorCatalog() {
        if (LS.getItem('colorTheme')) {
            const error = document.querySelector('.catalog-products__error');
            const color = LS.getItem('colorTheme');

            if (color == 'dark') error.style.color = wh;
            else error.style.color = '';
        }
    }
}