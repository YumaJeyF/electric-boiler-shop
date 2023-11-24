import v from '../_vars.js';
import { getProducts } from './get_data_products.js';
import { changeColorText } from './helper.js';
import { addToCart } from './helper.js';
import { workTwoSwipers } from './swipers_page_about_product.js';
import { createSlideSwiper } from './helper.js';
import { workIndexForCart } from './helper.js';

export const loadInformationAboutProducts = () => { 
    const { LS, options, swipersWrappersProductsInf, blocksCompatibility } = v;

    if (LS.getItem('productId')) {
        const id = LS.getItem('productId');
        if (id) dataSubstitution(id);
    }

    async function dataSubstitution(id) {
        const data = await getProducts();
        const page = data.products;
        const nowPage = page[id];

        const { productTitles, productsPrice, descriptionWarehouses, articles, blocksInf } = v;

        // Загрузка фотографий товара

        if (nowPage.pictures && nowPage.pictures.length > 0) {
            nowPage.pictures.forEach(linkImg => {
                swipersWrappersProductsInf.forEach(swiperWrapper => {
                    if (swiperWrapper.classList.contains('swiper-first__swiper-wrapper')) {
                        const slide = createSlideSwiper(linkImg, 'first');
                        swiperWrapper.innerHTML += slide;
                    } else {
                        const slide = createSlideSwiper(linkImg, 'second');
                        swiperWrapper.innerHTML += slide;
                    }
                });
            });
        }
        // Активация двух связанных слайдера

        workTwoSwipers();

        // Подгрузка остальной информации о товаре

        productTitles.forEach(title => title.innerHTML = nowPage.title);
        productsPrice.forEach(price => price.innerHTML = `${new Intl.NumberFormat('ru-RU', options).format(nowPage.price)}`);
        descriptionWarehouses.forEach(descriptionWarehouse => descriptionWarehouse.innerHTML = nowPage.availableInStock);
        articles.forEach(article => article.innerHTML = `Артикул: ${nowPage.article}`);


        function appendAndCreateText(texts, block) {
            texts.forEach(text => {
                const textInf = document.createElement('p');
                textInf.classList.add('tabs__text');
                textInf.classList.add('main-text');
                textInf.setAttribute('data-change-view', 'true');
                if (block.classList.contains('accordeon-product__content')) textInf.classList.add('accordeon-product__text');

                textInf.innerHTML = text;
                block.append(textInf);
            });
        }

        const texts = nowPage.text;
        if (texts && texts.length > 0) blocksInf.forEach(block => appendAndCreateText(texts, block));

        // Подгрузка данных по совместимости

        const compatibilityTexts = nowPage.compatibility;
        blocksCompatibility.forEach(block => appendAndCreateText(compatibilityTexts, block));

        // blocksCompatibility

        const descriptionBtns = document.querySelectorAll('.description__btn');

        descriptionBtns.forEach(btn => btn.addEventListener('click', () => {
            const response = workIndexForCart(+id);

            if (response != false && !btn.classList.contains('description__btn--clicked')) {
                btn.classList.add('description__btn--clicked');
                addToCart(id);
             }
        }));

        if (LS.getItem('indexForCart')) {
            const allIndex = JSON.parse(LS.getItem('indexForCart'));
            
            if (allIndex.includes(+id)) {
                const btns = document.querySelectorAll('.description__btn');

                btns.forEach(btn => {
                    if (!btn.classList.contains('description__btn--clicked')) btn.classList.add('description__btn--clicked');
                });
            }
        }

        changeColorText();
    } 
}