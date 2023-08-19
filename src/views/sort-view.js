import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function sortTemplate(sortType) {
  return ` <div class="sorting-price">
  <h3 class="title sorting-price__title">Цена</h3><a class="sorting-price__link sorting-price__link--incr sorting-price__link--active" href="#" aria-label="сортировка по возрастанию цены">
    <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
      <use xlink:href="#icon-increase-sort"></use>
    </svg></a><a class="sorting-price__link" href="#" aria-label="сортировка по убыванию цены">
    <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
      <use xlink:href="#icon-descending-sort"></use>
    </svg></a>
</div>`;
}

export default class SortView extends AbstractStatefulView {
  #sortType = null;
  #onSortTypeChange = null;

  constructor({ sortType, onSortTypeChange }) {
    super();
    this.#sortType = sortType;
    this.#onSortTypeChange = onSortTypeChange;
    // for (const btn of this.element.querySelectorAll('a.sort__button')) {
    //   btn.addEventListener('click', this.#handleSortChange);
    // }
  }

  get template() {
    return sortTemplate(this.#sortType);
  }

  #handleSortChange = (evt) => {
    evt.preventDefault();
    this.#onSortTypeChange(evt.target.dataset.sortType);
  };
}