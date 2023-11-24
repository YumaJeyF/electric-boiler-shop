import v from './../_vars.js';
import { addToCart } from './helper.js';
import { workIndexForCart } from './helper.js';

export const iconAppearanceOnHover = async () =>  {
    const products = document.querySelectorAll('.product');
    const productsIcons = document.querySelectorAll('.product__icon');
    const { LS } = v;

    const srcIconAdd = './img/basket-product-active.svg';

    if (window.innerWidth >= 800) {   
        products.forEach(product => product.addEventListener('mouseover', () =>{
            const iconProduct = document.querySelector(product.dataset.iconId);
            if (!iconProduct.classList.contains('product__icon--active')) iconProduct.classList.add('product__icon--active');
        }));

        products.forEach(product => product.addEventListener('mouseout', () => {
            const iconProduct = document.querySelector(product.dataset.iconId);
            if (iconProduct.classList.contains('product__icon--active')) iconProduct.classList.remove('product__icon--active');
        }));

    } else {
        productsIcons.forEach(icon => {
            if (!icon.classList.contains('product__icon--active')) icon.classList.add('product__icon--active');
        });
    }
    
    productsIcons.forEach(icon => icon.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = icon.closest('.product').dataset.productId - 1; 

        if (!icon.classList.contains('product__icon--add')) {
            icon.classList.add('product__icon--add');
            icon.firstElementChild.src = srcIconAdd;

            // Добавление товара в корзину
            addToCart(productId);

            workIndexForCart(productId);
        }
    }));

    function addIconCountProducts() {
        if (LS.getItem('indexForCart')) {
            const data = JSON.parse(LS.getItem('indexForCart'));

            if (data.length > 0) {
                data.forEach(index => {
                    const btnAddProduct = document.getElementById(`icon_${index + 1}`);
                
                    if (btnAddProduct && !btnAddProduct.classList.contains('product__icon--add')) {
                        btnAddProduct.classList.add('product__icon--add');
                        btnAddProduct.firstElementChild.src = srcIconAdd;
                    }
                });
            }
        }        
    }

    addIconCountProducts();
}