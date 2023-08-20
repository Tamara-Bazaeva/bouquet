import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { FilterColorType, FilterReasonType } from '../utils/const.js';

function colorFilterTemplate(colorFilters) {
  return `
  <section class="filter-color">
  <div class="container">
    <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
    <form class="filter-color__form" action="#" method="post">
      <div class="filter-color__form-fields" data-filter-color="filter">
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-0" name="colors" value="all" ${colorFilters.length === 0 ? 'checked' : ''} data-filter-color="color-all">
          <label class="filter-field-img__label" for="filter-colors-field-id-0"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-all.webp, img/content/filter-all@2x.webp 2x"><img src="img/content/filter-all.png" srcset="img/content/filter-all@2x.png 2x" width="130" height="130" alt="все цвета">
              </picture></span><span class="filter-field-img__text">все цвета</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-1" name="colors" value="red" ${colorFilters.some((f) => f === FilterColorType.RED) ? 'checked' : ''}  data-filter-color="color-red">
          <label class="filter-field-img__label" for="filter-colors-field-id-1"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-red.webp, img/content/filter-red@2x.webp 2x"><img src="img/content/filter-red.png" srcset="img/content/filter-red@2x.png 2x" width="130" height="130" alt="красный">
              </picture></span><span class="filter-field-img__text">красный</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-2" name="colors" value="white" ${colorFilters.some((f) => f === FilterColorType.WHITE) ? 'checked' : ''} data-filter-color="color-white">
          <label class="filter-field-img__label" for="filter-colors-field-id-2"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-white.webp, img/content/filter-white@2x.webp 2x"><img src="img/content/filter-white.png" srcset="img/content/filter-white@2x.png 2x" width="130" height="130" alt="белый">
              </picture></span><span class="filter-field-img__text">белый</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-3" name="colors" value="lilac" ${colorFilters.some((f) => f === FilterColorType.LILAC) ? 'checked' : ''} data-filter-color="color-lilac">
          <label class="filter-field-img__label" for="filter-colors-field-id-3"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-lilac.webp, img/content/filter-lilac@2x.webp 2x"><img src="img/content/filter-lilac.png" srcset="img/content/filter-lilac@2x.png 2x" width="130" height="130" alt="сиреневый">
              </picture></span><span class="filter-field-img__text">сиреневый</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-4" name="colors" value="yellow" ${colorFilters.some((f) => f === FilterColorType.YELLOW) ? 'checked' : ''} data-filter-color="color-yellow">
          <label class="filter-field-img__label" for="filter-colors-field-id-4"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-yellow.webp, img/content/filter-yellow@2x.webp 2x"><img src="img/content/filter-yellow.png" srcset="img/content/filter-yellow@2x.png 2x" width="130" height="130" alt="жёлтый">
              </picture></span><span class="filter-field-img__text">жёлтый</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-5" name="colors" value="pink" ${colorFilters.some((f) => f === FilterColorType.PINK) ? 'checked' : ''} data-filter-color="color-pink">
          <label class="filter-field-img__label" for="filter-colors-field-id-5"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-pink.webp, img/content/filter-pink@2x.webp 2x"><img src="img/content/filter-pink.png" srcset="img/content/filter-pink@2x.png 2x" width="130" height="130" alt="розовый">
              </picture></span><span class="filter-field-img__text">розовый</span></label>
        </div>
      </div>
      <button class="visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
    </form>
  </div>
</section>`;
}

function reasonFilterTemplate(reasonFilter) {
  return `<section class="filter-reason">
<div class="container">
  <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
  <form class="filter-reason__form" action="#" method="post">
    <div class="filter-reason__form-fields">
      <div class="filter-field-text filter-reason__form-field--for-all filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-all filter-reason__form-field" type="radio" id="filter-reason-field-id-0" name="reason" value="all" ${reasonFilter === null ? 'checked' : ''} checked>
        <label class="filter-field-text__label" for="filter-reason-field-id-0"><span class="filter-field-text__text">Для всех</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-birthday filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-birthday filter-reason__form-field" type="radio" id="filter-reason-field-id-1" name="reason" value="birthdayboy" ${reasonFilter === FilterReasonType.BIRTHDAY ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-1"><span class="filter-field-text__text">Имениннику</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-bride filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-bride filter-reason__form-field" type="radio" id="filter-reason-field-id-2" name="reason" value="bridge" ${reasonFilter === FilterReasonType.BRIDE ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-2"><span class="filter-field-text__text">Невесте</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-mother filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-mother filter-reason__form-field" type="radio" id="filter-reason-field-id-3" name="reason" value="motherday" ${reasonFilter === FilterReasonType.MOTHERDAY ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-3"><span class="filter-field-text__text">Маме</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-colleague filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-colleague filter-reason__form-field" type="radio" id="filter-reason-field-id-4" name="reason" value="colleagues" ${reasonFilter === FilterReasonType.COLLEAGUE ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-4"><span class="filter-field-text__text">Коллеге</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-darling filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-darling filter-reason__form-field" type="radio" id="filter-reason-field-id-5" name="reason" value="forlove" ${reasonFilter === FilterReasonType.DARLING ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-5"><span class="filter-field-text__text">Любимой</span></label>
      </div>
    </div>
    <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
  </form>
</div>
</section>`;
}


export default class FiltersView extends AbstractStatefulView {
  #onFilterChange = null;

  constructor({ reasonFilter, colorFilters, onFilterChange }) {
    super();
    this.#onFilterChange = onFilterChange;
    this._setState({
      reasonFilter,
      colorFilters
    });
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.filter-color__form').addEventListener('change', this.#handleColorFiltersChange);
    this.element.querySelector('.filter-reason__form').addEventListener('change', this.#handleReasonFilterChange);
  }

  get template() {
    return `<div>${reasonFilterTemplate(this._state.reasonFilter)}
    ${colorFilterTemplate(this._state.colorFilters)}</div>`;
  }

  #handleColorFiltersChange = (evt) => {
    evt.preventDefault();
    const formData = new FormData(this.element.querySelector('.filter-color__form'));
    const colorFilters = formData.getAll('colors');
    const allSelected = this._state.colorFilters.length !== 0 && colorFilters.some((f) => f === 'all');
    if (allSelected) {
      this.updateElement({
        colorFilters: []
      });
      this.#onFilterChange(this._state);
      return;
    }

    this.updateElement({
      colorFilters: colorFilters.filter((f) => f !== 'all')
    });

    this.#onFilterChange(this._state);
  };

  #handleReasonFilterChange = (evt) => {
    evt.preventDefault();
    const formData = new FormData(this.element.querySelector('.filter-reason__form'));
    let reasonFilter = formData.get('reason');
    if (reasonFilter === 'all') {
      reasonFilter = null;
    }
    this._setState({
      reasonFilter
    });

    this.#onFilterChange(this._state);
  };
}


