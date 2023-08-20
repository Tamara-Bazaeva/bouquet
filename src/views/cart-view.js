import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { UpdateType, UserAction } from '../utils/const.js';

function cartTemplate(state) {
  const list = state.bouquets.filter((b) => b.inCart > 0).map((b) => `
    <li class="popup-deferred__item">
        <div class="deferred-card ${b.loading ? 'is-loading' : ''}">
        <div class="deferred-card__img">
            <picture>
            <img src="${b.previewImage}" width="233" height="393" alt="букет">
            </picture>
        </div>
        <div class="deferred-card__content">
            <h2 class="title title--h2">${b.title}</h2>
            <p class="text text--size-40">${b.description}</p>
        </div>
        <div class="deferred-card__count">
            <button data-bouquet-id=${b.id} class="btn-calculate dec-btn" type="button">
            <svg width="30" height="27" aria-hidden="true">
                <use xlink:href="#icon-minus"></use>
            </svg>
            </button><span>${b.inCart}</span>
            <button data-bouquet-id=${b.id} class="btn-calculate inc-btn" type="button">
            <svg width="30" height="28" aria-hidden="true">
                <use xlink:href="#icon-cross"></use>
            </svg>
            </button>
        </div>
        <div class="deferred-card__price"><b class="price price--size-middle-p">${b.price}<span>Р</span></b>
        </div>
        <button class="btn-close deferred-card__close-btn" type="button" data-bouquet-id=${b.id} data-in-cart-count=${b.inCart}>
            <svg width="55" height="56" aria-hidden="true">
            <use xlink:href="#icon-close-big"></use>
            </svg>
        </button>
        <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
            <use xlink:href="#icon-loader"></use>
        </svg>
        </div>
    </li>`).join('');

  return `<section class="popup-deferred">
  <div class="popup-deferred__wrapper">
    <section class="hero hero--popup" ${state.loading ? 'is-loading' : ''}>
      <div class="hero__wrapper">
        <div class="hero__background">
          <picture>
            <source type="image/webp" srcset="img/content/hero-back-popup.webp, img/content/hero-back-popup@2x.webp 2x"><img src="img/content/hero-back-popup.jpg" srcset="img/content/hero-back-popup@2x.jpg 2x" width="1770" height="601" alt="фоновая картинка">
          </picture>
        </div>
        <div class="hero__content">
          <h2 class="title title--h1">Вас<br>заинтересовали</h2>
          <button class="btn-close btn-close--dark hero__popupclose" type="button" aria-label="Закрыть">
            <svg width="56" height="54" aria-hidden="true">
              <use xlink:href="#icon-union"></use>
            </svg>
          </button>
          <div class="btn-close btn-close--dark hero__loader">
            <svg class="hero__loader-icon" width="56" height="56" aria-hidden="true">
              <use xlink:href="#icon-loader"></use>
            </svg>
          </div>
        </div>
      </div>
    </section>
    <div class="popup-deferred__container">
      <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
        <svg width="61" height="24" aria-hidden="true">
          <use xlink:href="#icon-arrow"></use>
        </svg>
      </a>
      <ul class="popup-deferred__catalog">
        ${list}
      </ul>
      <div class="popup-deferred__btn-container">
        <button class="btn btn--with-icon popup-deferred__btn-clean" type="button">очистить
          <svg width="61" height="24" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div class="popup-deferred__sum">
        <p class="text text--total">Итого вы выбрали:</p>
        <div class="popup-deferred__block-wrap">
          <div class="popup-deferred__block">
            <p class="text text--total">Букеты</p><span class="popup-deferred__count" data-atribut="count-defer">${state.totalCount}</span>
          </div>
          <div class="popup-deferred__block">
            <p class="text text--total">Сумма</p><b class="price price--size-middle-p">${state.totalPrice}<span>Р</span></b>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

}

export default class CartView extends AbstractStatefulView {
  #handleInCartChange = null;
  #handleCloseClick = null;

  constructor({ bouquets, onInCartChange, onCloseClick }) {
    super();
    let price = 0;
    let count = 0;
    for (const bouquet of bouquets) {
      price += bouquet.inCart * bouquet.price;
      count += bouquet.inCart;
    }
    this._setState({
      bouquets: [...bouquets],
      loading: false,
      totalPrice: price,
      totalCount: count
    });

    this.#handleInCartChange = onInCartChange;
    this.#handleCloseClick = onCloseClick;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    const deferredCardCloseBtns = this.element.querySelectorAll('.deferred-card__close-btn');
    for (const closeBtn of deferredCardCloseBtns) {
      closeBtn.addEventListener('click', (evt) => {
        const bouquetId = evt.currentTarget.dataset.bouquetId;
        const inCartCount = evt.currentTarget.dataset.inCartCount;
        this.updateElement(this.#setLoadingForBouquet(bouquetId, true));

        this.#handleInCartChange(UserAction.REMOVED_FROM_FAV, UpdateType.UPDATE_CARD, { id: bouquetId, count: inCartCount });
      });
    }

    const decBtns = this.element.querySelectorAll('button.dec-btn');
    for (const decBtn of decBtns) {
      decBtn.addEventListener('click', (evt) => {
        const bouquetId = evt.currentTarget.dataset.bouquetId;
        this.updateElement(this.#setLoadingForBouquet(bouquetId, true));

        this.#handleInCartChange(UserAction.REMOVED_FROM_FAV, UpdateType.UPDATE_CARD, { id: bouquetId, count: 1 });
      });
    }

    const incBtns = this.element.querySelectorAll('button.inc-btn');
    for (const incBtn of incBtns) {
      incBtn.addEventListener('click', (evt) => {
        const bouquetId = evt.currentTarget.dataset.bouquetId;
        this.updateElement(this.#setLoadingForBouquet(bouquetId, true));

        this.#handleInCartChange(UserAction.ADDED_TO_FAV, UpdateType.UPDATE_CARD, bouquetId);
      });
    }

    this.element.querySelector('button.hero__popupclose').addEventListener('click', () => {
      this.#handleCloseClick();
    });

    this.element.querySelector('a.popup-deferred__btn').addEventListener('click', () => {
      this.#handleCloseClick();
    });

    this.element.querySelector('.popup-deferred__btn-clean').addEventListener('click', () => {
      this.#handleInCartChange(UserAction.ALL_REMOVED_FROM_FAV, UpdateType.UPDATE_CARDS);
    });
  }

  #setLoadingForBouquet = (bouquetId, loading) => {
    const index = this._state.bouquets.findIndex((b) => b.id === bouquetId);
    if (index === -1) {
      throw new Error('Can\'t update unexisting bouquet');
    }

    return {
      ...this._state,
      bouquets: [
        ...this._state.bouquets.slice(0, index),
        {
          ...this._state.bouquets[index],
          loading
        },
        ...this._state.bouquets.slice(index + 1)
      ]
    };
  };

  get template() {
    return cartTemplate(this._state);
  }

}
