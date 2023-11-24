import v from './../_vars.js';
import { productInCart } from './create_product_in_cart.js';
import { getProducts } from './get_data_products.js';
import { accordeonCart } from './helper.js';
import { changeThemeCart } from './helper.js';
import { createCartEmpty } from './helper.js';
import { countTotalSum } from './helper.js';
import { removeProduct } from './helper.js';

export const cart = async () => {
    const { LS, productsList, resultsSum, countProducts, btnConfirm, btnProductEdit, btnContinue, resultLabel, 
        cartHiddenMenu, resultInput, resultError, options } = v;

    resultsSum.forEach(resultSum => resultSum.innerHTML = new Intl.NumberFormat('ru-RU', options).format(0));

    const data = await getProducts();
    const pages = data.products;

    // Загрузка выбранных товаров

    if (LS.getItem('indexForCart')) {
        const arrWithIndex = JSON.parse(LS.getItem('indexForCart'));

        countProducts.innerHTML = arrWithIndex.length;

        if (arrWithIndex.length > 0) {
            arrWithIndex.forEach(index => {
                const product = pages[index];
                const price = new Intl.NumberFormat('ru-RU', options).format(product.price);

                const resProduct = productInCart(product.title, index, price);
                productsList.innerHTML += resProduct;
                LS.setItem('your-agree', 'true');
            });

            // Сохранённое количество каждого товара

            if (LS.getItem('saveCountProduct')) {
                const countProducts = JSON.parse(LS.getItem('saveCountProduct'));

                for (const key in countProducts) {
                    const inputValue = countProducts[key];
                    const indexProduct = key.slice(0, 1);
                    const product = pages[indexProduct];

                    const productPrice = document.querySelector(`[data-cart-price='${indexProduct}']`);
                    const input = document.querySelector(`[data-cart-input='${indexProduct}']`);

                    if (productPrice && input) {
                        input.value = inputValue;
                        productPrice.innerHTML = new Intl.NumberFormat('ru-RU', options).format(product.price * inputValue);
                    }
                }
            }

            // Суммирование цен всех товаров

            countTotalSum(options);
        } 
        else {
            productsList.innerHTML += createCartEmpty();
        }
    }

    // Функция для изменения цены товара
    // ===========================================================================================

    let saveCountProduct = {}

    function changeInfAboutProducts(input, inputOption) {
        input.value = inputOption;
        
        if (LS.getItem('saveCountProduct')) {
            const arrWithCountProducts = JSON.parse(LS.getItem('saveCountProduct'));
            arrWithCountProducts[`${input.dataset.cartInput}-product`] = input.value;
            LS.setItem('saveCountProduct', JSON.stringify(arrWithCountProducts));
        } else {
            saveCountProduct[`${input.dataset.cartInput}-product`] = input.value;
            LS.setItem('saveCountProduct', JSON.stringify(saveCountProduct));
        }

        const productPrice = document.querySelector(`[data-cart-price='${input.dataset.cartInput}']`);
        productPrice.innerHTML = new Intl.NumberFormat('ru-RU', options)
                                .format(pages[input.dataset.cartInput].price * input.value);
                        
        countTotalSum(options);
    }

    // Изменение количества товара
    // ===========================================================================================

    const btnsLeftChange = document.querySelectorAll('.products-list__num-left');
    const btnsRightChange = document.querySelectorAll('.products-list__num-right'); 
    
    btnsLeftChange.forEach(btn => btn.addEventListener('click', () => {
        const input = btn.nextElementSibling;
        if (input.value > 1) changeInfAboutProducts(input, --input.value);
    }));
    
    btnsRightChange.forEach(btn => btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        if (input.value > 0) changeInfAboutProducts(input, ++input.value);
    }));

    // ===========================================================================================

    // Удаление товара по клику на кнопку
    // ===========================================================================================
    
    const btnsRemoveDesktop = document.querySelectorAll('.products-list__remove-product--desktop');
    const btnsRemoveMobile = document.querySelectorAll('.products-list__remove-product--mobile');
    const popupMobileMenu = document.querySelectorAll('.menu-btns');
    const menuMobileBtnsRemove = document.querySelectorAll('.menu-btns__btn');

    let interval;

    // При клике на три точке на мобильных телефонах открывается меню с кнопками

    btnsRemoveMobile.forEach(btn => btn.addEventListener('click', () => {
        const popupMenuBtns = btn.lastElementChild;

        if (!popupMenuBtns.classList.contains('menu-btns--active')) {
            popupMobileMenu.forEach(menu => {
                if (menu.classList.contains('menu-btns--active')) menu.classList.remove('menu-btns--active');
            });

            popupMenuBtns.classList.add('menu-btns--active');
        }

        window.addEventListener('click', (e) => {
            if (!e.target.closest('.products-list__remove-product--mobile')) {
                if (popupMenuBtns.classList.contains('menu-btns--active')) popupMenuBtns.classList.remove('menu-btns--active');
            }
        });
    }));

    // Удаление товара в корзине по клику на кнопки

    menuMobileBtnsRemove.forEach(btn => btn.addEventListener('click', () => removeProduct(btn, options)));
    btnsRemoveDesktop.forEach(btn => btn.addEventListener('click', () => removeProduct(btn, options)));

    // ===========================================================================================

    // Логика по редактированию товаров в корзине
    // ===========================================================================================

    btnProductEdit.addEventListener('click', () => accordeonCart(btnProductEdit));

    btnContinue.addEventListener('click', () => {
        if (LS.getItem('indexForCart')) {
            const data = JSON.parse(LS.getItem('indexForCart'));

            if (data.length > 0 && btnConfirm.classList.contains('result__btn-confirm--disable')) {
                accordeonCart(btnProductEdit);

                resultInput.checked = true;
                btnConfirm.classList.remove('result__btn-confirm--disable');

                if (resultError.classList.contains('result__error--active')) {
                    clearInterval(interval);
                    resultError.classList.remove('result__error--active');
                }
            }
        }
    });

    resultLabel.addEventListener('click', () => {
        if (cartHiddenMenu.classList.contains('your-products__hidden-menu--hidden')) {
            if (!resultLabel.previousElementSibling.checked && btnConfirm.classList.contains('result__btn-confirm--disable')){
                btnConfirm.classList.remove('result__btn-confirm--disable');
                LS.setItem('your-agree', 'true');
            } else {
                btnConfirm.classList.add('result__btn-confirm--disable');
                LS.removeItem('your-agree', 'true');
            }
        } else {
            resultLabel.previousElementSibling.checked = true;
            resultError.classList.add('result__error--active');

            interval = setTimeout(() => {
                resultError.classList.remove('result__error--active');
            }, 3000);
        }
    });

    if (LS.getItem('hiddenMenu')) {
        const response = LS.getItem('hiddenMenu');
        if (response == 'hidden') accordeonCart(btnProductEdit);
    }

    if (LS.getItem('your-agree')) {
        const response = LS.getItem('your-agree');
        const currentProducts = document.querySelectorAll('.products-list__product');

        if (response == 'true' && cartHiddenMenu.classList.contains('your-products__hidden-menu--hidden') && currentProducts.length > 0) {
            btnConfirm.classList.remove('result__btn-confirm--disable');
            resultLabel.previousElementSibling.checked = true;
        }
    }

    // ===========================================================================================

    // Изменение цвета текста в информации о товаре

    changeThemeCart();
}
