import v from './../_vars.js';

export const mobileFilters = () => {
    const btnOpen = document.querySelector('.mobile-filters__btn-filter');
    const arrowsClose = document.querySelectorAll('[data-close-arrow]');
    const filtersTitles = document.querySelectorAll('[data-acc-mobile]');

    const filtersManufacturer = document.querySelector('.filters-container__manufacturer');
    const filtersParts = document.querySelector('.filters-container__spare-parts');

    const { body, LS, btnsSecThrow, filtersBoilers, filtersSpareParts, popup } = v;
    const paddingRight = window.innerWidth - body.offsetWidth + 'px';

    let saveMobMenu = {}

    btnOpen.addEventListener('click', openMenuMainFilters);

    popup.addEventListener('click', e => {
        if (!e.target.closest('.filters-container__menu')) {
            if (!filtersManufacturer.classList.contains('_open') && !filtersParts.classList.contains('_open')) closeMenuMainFilters();
            else closeSecMenuFilters();
        }
    });

    arrowsClose.forEach(arrow => arrow.addEventListener('click', e => {
        const id = e.currentTarget.dataset.closeArrow;
        const menu = document.querySelector(id);

        if (menu.classList.contains('_open')) {
            if (id == '#main-menu') closeMenuMainFilters();
            else closeSecMenuFilters();
        }
    }));

    filtersTitles.forEach(title => title.addEventListener('click', e => {
        const menu = document.querySelector(e.currentTarget.dataset.accMobile);
        openSecMenuFilters(menu);
    }));

    // Второстепенные меню
    // ==========================================================================================

    function closeSecMenuFilters() {
        const secMenu = document.querySelectorAll('[data-filters-sec]');

        secMenu.forEach(menu => {
            if (menu.classList.contains('_open')) {
                menu.classList.remove('_open');
                menu.classList.remove('_open-sec-menu');
                delete saveMobMenu[`active-mob-menu-${menu.id}`];
                LS.setItem('mob-filters', JSON.stringify(saveMobMenu));
            }
        });
    }

    function openSecMenuFilters(menu) {
        if (!menu.classList.contains('_open')) {
            menu.classList.add('_open');
            menu.classList.add('_open-sec-menu');
            saveMobMenu[`active-mob-menu-${menu.id}`] =  menu.id;
            LS.setItem('mob-filters', JSON.stringify(saveMobMenu));
        }
    }

    // Основное меню
    // ==========================================================================================

    function openMenuMainFilters() {
        if (!popup.classList.contains('filters-container--active')) {
            popup.classList.add('filters-container--active');
            popup.classList.add('_open');
            body.style.position = 'fixed';
            body.style.top = -window.scrollY + 'px';
            body.style.paddingRight = paddingRight;
            saveMobMenu[`active-mob-menu-${popup.id}`] =  popup.id;
            LS.setItem('mob-filters', JSON.stringify(saveMobMenu));
        }
    }

    function closeMenuMainFilters() {
        if (popup.classList.contains('filters-container--active')) {
            popup.classList.remove('filters-container--active');
            popup.classList.remove('_open');
            body.style.position = '';
            body.style.paddingRight = '';
            window.scrollTo(0, parseInt(body.style.top) * -1);
            body.style.top = 0;
            delete saveMobMenu[`active-mob-menu-${popup.id}`];
            LS.setItem('mob-filters', JSON.stringify(saveMobMenu));
        }
    }

    if (LS.getItem('mob-filters')) {
        const saveValues = JSON.parse(LS.getItem('mob-filters'));
        const allMenu = document.querySelectorAll('[data-mob-menu]');

        for (const key in saveValues) {
            allMenu.forEach(menu => {
                const id = menu.id;
                const saveId = saveValues[key];
                
                if (id == saveId) {
                    if (saveId == 'main-menu') openMenuMainFilters();
                    else openSecMenuFilters(document.querySelector(`#${saveId}`));
                }
            })
        }
    }

    // Удаление фильтров
    // ==========================================================================================

    btnsSecThrow.forEach(btn => btn.addEventListener('click', e => {
        let activeFilters;
        
        if (LS.getItem('filters')) activeFilters = JSON.parse(LS.getItem('filters'));
        if (e.currentTarget.dataset.secThrow == 'manufacturer') deleteFilters(filtersBoilers);
        if (e.currentTarget.dataset.secThrow == 'spare-parts') deleteFilters(filtersSpareParts);
    }));

    function deleteFilters(deleteFilters) {
        let newArr = [];
    
        deleteFilters.forEach(filter => filter.previousElementSibling.checked = false);
    
        if (activeFilters && activeFilters.length > 0) {
            activeFilters.forEach((filter, i) => {
                if (filter.slice(0, 1) != 'p') { 
                    newArr.push(filter);
                    LS.setItem('filters', JSON.stringify(newArr));
                }
            });
        }
    }
}