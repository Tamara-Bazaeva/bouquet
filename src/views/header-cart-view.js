import AbstractView from '../framework/view/abstract-view.js';

function headerCartTemplate({ price, count }) {
  return `<div class="header-count">
  <button class="header-count__btn" type="button">
    <svg width="60" height="47" aria-hidden="true">
      <use xlink:href="#icon-heart-header"></use>
    </svg>
    <span class="visually-hidden">закрыть</span>
  </button>
  <div class="header-count__count">
    <p class="text text--size-20 header-count__counter">${count}</p>
  </div>
  <div class="header-count__block">
    <p class="text text--size-20 header-count__text">сумма</p>
    <b class="price price--size-min header-count__price">
      ${price}
      <span>Р</span>
    </b>
  </div>
</div>`;

}

export default class HeaderCartView extends AbstractView {
  #price = 0;
  #count = 0;

  constructor({ bouquets, onClick }) {
    super();
    let price = 0;
    let count = 0;
    for (const bouquet of bouquets) {
      price += bouquet.inCart * bouquet.price;
      count += bouquet.inCart;
    }

    this.#price = price;
    this.#count = count;

    this.element.querySelector('.header-count__btn').addEventListener('click', onClick);
  }

  get template() {
    return headerCartTemplate({ price: this.#price, count: this.#count });
  }

}
