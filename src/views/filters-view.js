import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function colorFilterTemplate(colorFilters) {
  const all = colorFilters.some((f) => f === 'color-all');
  

  return `
  <section class="filter-color">
  <div class="container">
    <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
    <form class="filter-color__form" action="#" method="post">
      <div class="filter-color__form-fields" data-filter-color="filter">
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-0" name="colors" value="color-all" checked data-filter-color="color-all">
          <label class="filter-field-img__label" for="filter-colors-field-id-0"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-all.webp, img/content/filter-all@2x.webp 2x"><img src="img/content/filter-all.png" srcset="img/content/filter-all@2x.png 2x" width="130" height="130" alt="все цвета">
              </picture></span><span class="filter-field-img__text">все цвета</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-1" name="colors" value="color-red" data-filter-color="color-red">
          <label class="filter-field-img__label" for="filter-colors-field-id-1"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-red.webp, img/content/filter-red@2x.webp 2x"><img src="img/content/filter-red.png" srcset="img/content/filter-red@2x.png 2x" width="130" height="130" alt="красный">
              </picture></span><span class="filter-field-img__text">красный</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-2" name="colors" value="color-white" data-filter-color="color-white">
          <label class="filter-field-img__label" for="filter-colors-field-id-2"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-white.webp, img/content/filter-white@2x.webp 2x"><img src="img/content/filter-white.png" srcset="img/content/filter-white@2x.png 2x" width="130" height="130" alt="белый">
              </picture></span><span class="filter-field-img__text">белый</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-3" name="colors" value="color-lilac" data-filter-color="color-lilac">
          <label class="filter-field-img__label" for="filter-colors-field-id-3"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-lilac.webp, img/content/filter-lilac@2x.webp 2x"><img src="img/content/filter-lilac.png" srcset="img/content/filter-lilac@2x.png 2x" width="130" height="130" alt="сиреневый">
              </picture></span><span class="filter-field-img__text">сиреневый</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-4" name="colors" value="color-yellow" data-filter-color="color-yellow">
          <label class="filter-field-img__label" for="filter-colors-field-id-4"><span class="filter-field-img__img">
              <picture>
                <source type="image/webp" srcset="img/content/filter-yellow.webp, img/content/filter-yellow@2x.webp 2x"><img src="img/content/filter-yellow.png" srcset="img/content/filter-yellow@2x.png 2x" width="130" height="130" alt="жёлтый">
              </picture></span><span class="filter-field-img__text">жёлтый</span></label>
        </div>
        <div class="filter-field-img filter-color__form-field">
          <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-5" name="colors" value="color-pink" data-filter-color="color-pink">
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

function reasonFilterTemplate(){
  return `<section class="filter-reason">
<div class="container">
  <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
  <form class="filter-reason__form" action="#" method="post">
    <div class="filter-reason__form-fields">
      <div class="filter-field-text filter-reason__form-field--for-all filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-all filter-reason__form-field" type="radio" id="filter-reason-field-id-0" name="reason" value="for-all" checked>
        <label class="filter-field-text__label" for="filter-reason-field-id-0"><span class="filter-field-text__text">Для всех</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-birthday filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-birthday filter-reason__form-field" type="radio" id="filter-reason-field-id-1" name="reason" value="for-birthday">
        <label class="filter-field-text__label" for="filter-reason-field-id-1"><span class="filter-field-text__text">Имениннику</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-bride filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-bride filter-reason__form-field" type="radio" id="filter-reason-field-id-2" name="reason" value="for-bride">
        <label class="filter-field-text__label" for="filter-reason-field-id-2"><span class="filter-field-text__text">Невесте</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-mother filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-mother filter-reason__form-field" type="radio" id="filter-reason-field-id-3" name="reason" value="for-mother">
        <label class="filter-field-text__label" for="filter-reason-field-id-3"><span class="filter-field-text__text">Маме</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-colleague filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-colleague filter-reason__form-field" type="radio" id="filter-reason-field-id-4" name="reason" value="for-colleague">
        <label class="filter-field-text__label" for="filter-reason-field-id-4"><span class="filter-field-text__text">Коллеге</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-darling filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-darling filter-reason__form-field" type="radio" id="filter-reason-field-id-5" name="reason" value="for-darling">
        <label class="filter-field-text__label" for="filter-reason-field-id-5"><span class="filter-field-text__text">Любимой</span></label>
      </div>
    </div>
    <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
  </form>
</div>
</section>`;
}


export default class FiltersView extends AbstractStatefulView {
  #onFilterTypeChange = null;

  constructor({ reasonFilter, сolorFilters, onFilterTypeChange }) {
    super();

    this._setState({
      reasonFilter, 
      сolorFilters
    });
    
    this.#onFilterTypeChange = onFilterTypeChange;

    this.element.querySelector('.filter-color__form').addEventListener('change', this.#handleColorFilterChange);
    this.element.querySelector('.filter-reason__form').addEventListener('change', this.#handleReasonFilterChange);
  }

  get template() {
    return `${reasonFilterTemplate(this._state.reasonFilter)}
    ${colorFilterTemplate(this._state.colorFilters)}`;
  }

  #handleColorFilterChange = (evt) => {
    evt.preventDefault();
    const formData = new FormData(this.element.querySelector('.filter-color__form'));

    this.#onFilterTypeChange({currentColorFilterType: formData.get('colors'), currentReasonFilterType: this.#currentReasonFilterType});
  };

  #handleReasonFilterChange = (evt) => {
    evt.preventDefault();
    const formData = new FormData(this.element.querySelector('.filter-reason__form'));

    this.#onFilterTypeChange({currentReasonFilterType: formData.get('reason'), currenColorFilterType: this.#currentColorFilterType});
  };
}


