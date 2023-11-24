import v from './../_vars.js';

export const tabs = () => {
    const btnsTab = document.querySelectorAll('[data-tabs]');
    const allTabsInf = document.querySelectorAll('[data-content-tabs]');
    
    btnsTab.forEach(btn => btn.addEventListener('click', () => {
        const tab = document.querySelector(btn.dataset.tabs);
 
        if (!btn.classList.contains('_active') && !tab.classList.contains('_open')) {
            btnsTab.forEach(btn => {
                if (btn.classList.contains('_active')) btn.classList.remove('_active');
            });

            allTabsInf.forEach(tabInf => {
                if (tabInf.classList.contains('_open')) tabInf.classList.remove('_open');
            });

            btn.classList.add('_active');
            tab.classList.add('_open');
        }
    }));

    document.querySelector('[data-tabs]').click();
}