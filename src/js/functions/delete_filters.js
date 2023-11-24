export const deleteFilters = () => {
    const activeFilters = document.querySelectorAll('.current-filters__inf');
    const btnsCloseFilters = document.querySelectorAll('.current-filters__btn-close');

    activeFilters.forEach(filter => filter.addEventListener('mouseover', e => {
        e.currentTarget.lastElementChild.classList.add('current-filters__btn-close--active');
    }));
    
    activeFilters.forEach(filter => filter.addEventListener('mouseout', e => {
        e.currentTarget.lastElementChild.classList.remove('current-filters__btn-close--active');
    }));
    
    btnsCloseFilters.forEach(btn => btn.addEventListener('click', e => {
        e.currentTarget.parentNode.remove();

        const id = e.currentTarget.dataset.id;
        const filter = document.querySelector(`[for='${id}']`);

        if (filter.previousElementSibling.checked) filter.previousElementSibling.checked = false;
    }));
}