export function createProductPage(id, name, article, price, manufacturer, spareParts, url) {
    return `
    <div class="product" data-product-id='${id}' data-icon-id='#icon_${id}' data-price='${price}' data-name-manufacturer='${manufacturer}' data-spare-parts='${spareParts}'>
     <a href="${url}" style="text-decoration: none;">
      <div class="product__body">
          <div class="product__pic">
              <img src="./img/card-product1.png" alt="photo product" class="product__image" loading="lazy"'>
          </div>
          <h3 class="product__name main-text">${name}</h3>
          <p class="product__article">Артикул: ${article}</p>
          <div class="product__inf">
              <p class="product__price">${price}</p>
              <div class="product__icon" id='icon_${id}'>
                  <img src="img/basket-product.svg" alt="basket" class="product__img">
              </div>
          </div>
      </div>
     </a>
    </div>
    `
}