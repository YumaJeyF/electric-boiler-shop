import v from '../_vars.js';

import { lightTheme } from './light_theme.js';
import { darkTheme } from './dark_theme.js';
import { changeThemeCart } from './helper.js';

export const changeTheme = () => {
    
    const { wh, LS } = v;

    v.themes.forEach(theme => theme.addEventListener('input', () => {
        if (!theme.checked) {
           // Настройки для светлой темы
            lightTheme();
            LS.setItem('colorTheme', 'light');
            LS.setItem('inputChecked', false);

            // Динамическое изменение цветов для светлой темы в информации о товаре в корзине
            changeThemeCart();
        } else {
            // Настройки для тёмной темы
            darkTheme();
            LS.setItem('colorTheme', 'dark');
            LS.setItem('inputChecked', true); 
            
            // Динамическое изменение цветов для тёмной темы в информации о товаре в корзине
            changeThemeCart();
        }
    }));

    if (LS.getItem('colorTheme')) {
        if (LS.getItem('colorTheme') == 'light') lightTheme();
        else darkTheme();
    }

    v.navLinks.forEach(link => link.addEventListener('mouseover', () => {
        if (LS.getItem('colorTheme') == 'dark') link.style.color = '#FFC540';
    }));

    v.navLinks.forEach(link => link.addEventListener('mouseout', () => {
        if (LS.getItem('colorTheme') == 'dark') link.style.color = wh;
    }));
}