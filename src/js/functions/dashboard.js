export const dashboard = () => {
    return`
    <section class="control-menu">
    <div class="control-menu__body">
        <div class="control-menu__left">
            <p class="control-menu__quantity-product">В корзине <span class="control-menu__quantity">4</span> товара</p>
            <p class="control-menu__price-inf">на сумму <span class="control-menu__price">15 000</span> ₽</p>
        </div>
        <div class="control-menu__right">
            <button class="control-menu__btn-basket">Перейти в корзину</button>
            <button class="control-menu__btn-place-order">Оформить заказ</button>
        </div> 
        <button class="control-menu__btn-close"></button>
    </div>
    </section>
    `
}