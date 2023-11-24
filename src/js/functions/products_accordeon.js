export const productsAccordeon = () => {
    const accTitles = document.querySelectorAll('[data-accordeon-product]');

    accTitles.forEach(title => title.addEventListener('click', function() {
        const content = document.querySelector(this.dataset.accordeonProduct);
        const arrow = this.lastElementChild;
        const nameTitle = this.firstElementChild;

        if (!content.classList.contains('accordeon-product__content--active') && !content.style.maxHeight) {
            content.style.maxHeight = content.scrollHeight + 'px';
            nameTitle.classList.add('accordeon-product__btn--active');
            content.classList.add('accordeon-product__content--active');
            arrow.classList.add('accordeon-product__icon--active');
        } else {
            content.style.maxHeight = null;
            nameTitle.classList.remove('accordeon-product__btn--active');
            content.classList.remove('accordeon-product__content--active');
            arrow.classList.remove('accordeon-product__icon--active');
        }
    }));
}