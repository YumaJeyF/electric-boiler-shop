import v from './../_vars.js';
import { createfilter } from './helper.js';
import { deleteFilters } from './delete_filters.js';
import { countPages } from './helper.js';
import { filterProducts } from './helper.js';
import { sortOnPrice } from './helper.js';
import { addFilterProduct } from './helper.js';
import { testInputValue } from './helper.js';

export const filters = () => {
    const { accordeonTitles, manufacturer, spareParts, btnsShow, filters, btnsThrowFilter, btnsAllValue,
    filtersSpareParts, filtersBoilers, catalogProducts, pagination, searchField, LS} = v;
    
    if (!LS.getItem('titles-active')) LS.setItem('titles-active', {});

    accordeonTitles.forEach(title => title.addEventListener('click', function() {
        const content = this.nextElementSibling;
        let saveIndexTitles;

        if (LS.getItem('titles-active')) saveIndexTitles = JSON.parse(LS.getItem('titles-active'));
                
        if (!content.classList.contains('accordeon__content--visible') && !content.style.maxHeight) {
            content.classList.add('accordeon__content--visible');
            content.style.maxHeight = content.scrollHeight + 'px';
            this.lastElementChild.classList.add('accordeon__icon--active');
            saveIndexTitles[`active-title${this.dataset.accTitle}`] = this.dataset.accTitle;
        } else {
            content.classList.remove('accordeon__content--visible');
            content.style.maxHeight = null;
            this.lastElementChild.classList.remove('accordeon__icon--active');
            delete saveIndexTitles[`active-title${this.dataset.accTitle}`]
        }
        LS.setItem('titles-active', JSON.stringify(saveIndexTitles));
    }));

    if (LS.getItem('titles-active')) {
        const titlesIndex = JSON.parse(LS.getItem('titles-active'));

        for (const key in titlesIndex) {
            accordeonTitles.forEach(title => {
                const i = title.dataset.accTitle;
                const saveIndex = titlesIndex[key];
                const content = title.nextElementSibling;

                if (saveIndex == i) {
                    content.classList.add('accordeon__content--visible');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    title.lastElementChild.classList.add('accordeon__icon--active');
                }
            });
        }
    }

    // Добавление меню с фильтрами в зависимости от размеров окна
    
    const filtersBody = document.querySelector('.filters__body');
    const filtersSection = document.querySelector('.filters');
    const filtersMobile = document.querySelector('.filters-container');
    const windowWidth = window.innerWidth;

    if (windowWidth <= 1039) {
        filtersSection.innerHTML = '';
        filtersSection.append(filtersMobile);
    }

    if (windowWidth > 1039) {
        filtersSection.innerHTML = '';
        filtersSection.append(filtersBody);
    }

    window.addEventListener('resize', () => {
        const windowWidth = window.innerWidth;

        if (windowWidth <= 1039 && !filtersSection.classList.contains('_change-mobile')) {
            filtersSection.classList.add('_change-mobile');
            if (filtersSection.classList.contains('_change-desktop')) filtersSection.classList.remove('_change-desktop')
            
            filtersSection.innerHTML = '';
            filtersSection.append(filtersMobile);
        }
    
        if (windowWidth > 1039 && !filtersSection.classList.contains('_change-desktop')) {
            filtersSection.classList.add('_change-desktop');
            if (filtersSection.classList.contains('_change-mobile')) filtersSection.classList.remove('_change-mobile');
            
            filtersSection.innerHTML = '';
            filtersSection.append(filtersBody);
        }
    });

    // Добавление фильтров

    btnsShow.forEach(btnShow => btnShow.addEventListener('click', async () => {
        const activeFilters = document.querySelectorAll('.current-filters__inf');
        const nowFilters = document.querySelectorAll('.accordeon__label');
        const saveFilters = [];
        catalogProducts.innerHTML = '';
        pagination.innerHTML = '';

        if (activeFilters.length > 0) activeFilters.forEach(el => el.remove());

        nowFilters.forEach(filter => {
            const name = filter.getAttribute('for');
            const newFilter = createfilter(filter.innerHTML, name);

            if (filter.previousElementSibling.checked) {

                if (filter.dataset.label == 'boilers') {
                    saveFilters.push(`b${name}`);
                    if (manufacturer) manufacturer.innerHTML += newFilter;
                } else {
                    saveFilters.push(`p${name}`);
                    if (spareParts) spareParts.innerHTML += newFilter;
                }
            }
        });

        const countProducts = countPages();

        const sortProductsWithoutPrice = await filterProducts();
        const resultSort = await sortOnPrice(sortProductsWithoutPrice);

        if (resultSort) addFilterProduct(resultSort, countProducts);
        else addFilterProduct(await testInputValue(searchField.value), countProducts);

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        LS.setItem('filters', JSON.stringify(saveFilters));
        deleteFilters();
    }));

    if (LS.getItem('filters')) {
        const getFilters = JSON.parse(LS.getItem('filters'));

        getFilters.forEach(getFilter => {
            const saveAtr = getFilter.slice(1);
            const filter = document.querySelector(`[for='${saveAtr}']`);
            const newFilter = createfilter(filter.innerHTML, saveAtr);

            filter.previousElementSibling.checked = true;

            if (manufacturer && spareParts) {
                if (getFilter.slice(0, 1) == 'b') manufacturer.innerHTML += newFilter;
                else spareParts.innerHTML += newFilter;
            }
        });
    }

    // Все значения фильтров

    btnsAllValue.forEach(btn => btn.addEventListener('click', () => {
        if (btn.dataset.allValue == '1') {
            filtersBoilers.forEach(filter => {
                if (!filter.previousElementSibling.checked) filter.previousElementSibling.checked = true;
            });
        } else {
            filtersSpareParts.forEach(filter => {
                if (!filter.previousElementSibling.checked) filter.previousElementSibling.checked = true;
            });
        }
    }));

    // Удаление фильтров

    btnsThrowFilter.forEach(btn => btn.addEventListener('click', () => {
        const currentFilters = document.querySelectorAll('.current-filters__inf');

        filters.forEach(filter => {
            if (filter.previousElementSibling.checked) filter.previousElementSibling.checked = false;
        });

        if (currentFilters.length > 0) currentFilters.forEach(el => el.remove());
        LS.removeItem('filters');
        LS.removeItem('saveInputsPrice');
    }));

    const activeFilters = document.querySelectorAll('.current-filters__inf');
    const btnsCloseFilters = document.querySelectorAll('.current-filters__btn-close');

    if (activeFilters.length > 0 && btnsCloseFilters.length > 0) deleteFilters();
}