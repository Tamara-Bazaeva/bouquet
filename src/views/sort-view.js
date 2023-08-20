import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { SortType } from '../utils/const.js';

function sortTemplate(sortType) {
  return `<div class="catalogue__header">
  <h2 class="title title--h3 catalogue__title">Каталог</h2>
  <div class="catalogue__sorting">
    <div class="sorting-price">
      <h3 class="title sorting-price__title">Цена</h3><a id="price-asc" class="sorting-price__link sorting-price__link--incr ${sortType === SortType.PRICE_ASC ? 'sorting-price__link--active' : ''}" href="#" aria-label="сортировка по возрастанию цены">
        <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
          <use xlink:href="#icon-increase-sort"></use>
        </svg></a><a id="price-desc" class="sorting-price__link ${sortType === SortType.PRICE_DESC ? 'sorting-price__link--active' : ''}" href="#" aria-label="сортировка по убыванию цены">
        <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
          <use xlink:href="#icon-descending-sort"></use>
        </svg></a>
    </div>
  </div>
</div>`;
}

export default class SortView extends AbstractStatefulView {
  #onSortTypeChange = null;

  constructor({ sortType, onSortTypeChange }) {
    super();
    this._setState({
      sortType
    });
    this.#onSortTypeChange = onSortTypeChange;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('#price-asc').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#handleSortTypeChange(SortType.PRICE_ASC);
    });
    this.element.querySelector('#price-desc').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#handleSortTypeChange(SortType.PRICE_DESC);
    });
  }

  get template() {
    return sortTemplate(this._state.sortType);
  }

  #handleSortTypeChange = (sortType) => {
    this.updateElement({
      sortType
    });
    this.#onSortTypeChange(sortType);
  };
}
