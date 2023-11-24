import v from '../_vars.js';

export const footerAcc = () => {
    const { titlesMobile } = v;

    titlesMobile.forEach(title => title.addEventListener('click', e => {
        const hiddenContent = e.currentTarget.nextElementSibling;

        if (!hiddenContent.classList.contains('footer-top__hidden-mobile--visible') && !hiddenContent.style.maxHeight) {
            e.currentTarget.classList.add('footer__title--open');
            hiddenContent.classList.add('footer-top__hidden-mobile--visible');
            hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
        } else {
            e.currentTarget.classList.remove('footer__title--open');
            hiddenContent.classList.remove('footer-top__hidden-mobile--visible');
            hiddenContent.style.maxHeight = null;
        }
    }));
}