'use strict'

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
let initialGoods = [];
const container = document.querySelector('.body__products-list');
const containerLoader = document.querySelector('.body__loader');

const wait = (delay) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

const renderGoods = (goodsArray) => goodsArray.forEach(good => {
  const { id, itemId, name, fullPrice, price, screen, capacity, ram } = good;

  containerLoader.classList.add('body__loader--off')
  container.insertAdjacentHTML('beforeend', `
    <div class="body__product-item" id=${id}>
      <div class="products-list" id=${itemId}>
        <div class="products-list__img-box">
          <img src="./img/apple.jpg">
        </div>
        <h3 class="products-list__title">
          ${name}
        </h3>
        <div class="products-list__price-box">
          <span class="products-list__price">
            $${price}
          </span>
          <span class="products-list__price products-list__price--discont">
            $${fullPrice}
          </span>
        </div>
        <div class="products-list__about">
          <span class="products-list__feature">
            Screen
          </span>
          <span class="products-list__feature-size">
            ${screen}
          </span>
        </div>
        <div class="products-list__about">
          <span class="products-list__feature">
            Capacity
          </span>
          <span class="products-list__feature-size">
            ${capacity}
          </span>
        </div>
        <div class="products-list__about">
          <span class="products-list__feature">
            RAM
          </span>
          <span class="products-list__feature-size">
            ${ram}
          </span>
        </div>
        <div class="products-list__add-cart-box">
          <button class="products-list__add-cart">
            Add to carth
          </button>
          <button class="products-list__favorite"></button>
        </div>
      </div>
    </div>
  `);
})

const request = () => wait(2000)
  .then(() => fetch(BASE_URL))
  .then(response => {
    if (!response.ok) {
      console.log('error');
      throw new Error();
    }

    return response.json();
  })
  .then(goods => {
    initialGoods = goods;
    renderGoods(initialGoods);
  })
  .catch((error) => console.log(error));

request();
