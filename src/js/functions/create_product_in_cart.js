export const productInCart = (title, index, price) => {
    return `
    <div class="products-list__product">
    <div class="products-list__pic">
        <img src="../img/pic-cart.png" alt="photo product" class="product-list__img">
    </div>
    <h2 class="products-list__title main-text" data-change-inf-product>${title}</h2>
    <div class="products-list__change-count-product">
        <button class="products-list__num-left products-list__btn-change" data-change-inf-product>–</button>
        <input type="number" value="1" min="1" class="products-list__input" data-cart-input='${index}' data-change-inf-product>
        <button class="products-list__num-right products-list__btn-change" data-change-inf-product>+</button>
    </div>
    <h2 class="products-list__price cart-title" data-cart-price='${index}' data-change-inf-product>${price}</h2>
    <button class="products-list__remove-product products-list__remove-product--desktop" data-cart-btn="${index}" data-change-inf-product>Удалить</button>
    <button class="products-list__remove-product products-list__remove-product--mobile">
        <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#1C629E"/>
            <circle cx="1.5" cy="7.5" r="1.5" fill="#1C629E"/>
            <circle cx="1.5" cy="13.5" r="1.5" fill="#1C629E"/>
        </svg>
        <div class='menu-btns'>
        <ul class='menu-btns__list'>
            <li class='menu-btns__btn' data-cart-btn="${index}">Удалить</li>
        </ul> 
        </div>
    </button>
    </div>
    `
}