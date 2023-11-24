import { displayList } from "./helper.js";
import { getProducts } from './get_data_products.js';
import { tabs } from './tabs.js';
import { productsAccordeon } from './products_accordeon.js'
import v from '../_vars.js';

export const loadProductMain = async () => {
    const data = await getProducts();
    const pages = data.products;
    const { allSwipersWrappers, LS } = v;

    if (allSwipersWrappers.length > 0) {
        allSwipersWrappers.forEach(swiper => {

            // Слайдер 'Тебе понравится'
            if (swiper.classList.contains('liked-it__swiper-wrapper')) {
                displayList(pages, 10, 1, swiper);

                const windowWidth = window.innerWidth;
        
                if (windowWidth > 992) tabs();
                else productsAccordeon();
            }

            // Слайдер 'Хиты продаж'
            if (swiper.classList.contains('details-boilers__swiper-hits')) displayList(pages, 8, 2, swiper);
            
            // Слайдер 'Новинки'
            if (swiper.classList.contains('details-boilers__swiper-new')) displayList(pages, 8, 3, swiper);
            
        });
    }
}