import FilterReasonView from '../views/filter-reason-view.js';
import FilterColorView from '../views/filter-color-view.js';
import { render, remove, replace, RenderPosition } from '../framework/render.js';
import { FilterReasonType, FilterColorsType } from '../utils/const.js';
import filter from '../utils/filter.js';

export default class FiltersPresenter {
  #container = null;
  #filtersModel = null;
  #flowersModel = null;
  #filterReasonView = null;
  #filterColorView = null;

  constructor({ container, filtersModel, flowersModel }) {
    this.#container = container;
    this.#flowersModel = flowersModel;
    this.#filtersModel = filtersModel;

    this.#flowersModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const flowers = this.#flowersModel.flowers;

    return {
      Object.values(FilterColorsType).map((type) => ({
        type,
        // count: filter[type](flowers).length
      })),
      Object.values(FilterReasonType).map((type) => ({
        type
      }))
    }
  }

  renderFilters() {
    const filters = this.filters;
    const prevFilterReasonView = this.#filterReasonView;
    const prevFilterColorView = this.#filterColorView;

    this.#filterReasonView = new FilterReasonView({
      filters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterReasonTypeChange
    });
    this.#filterColorView = new FilterColorView({
      filters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterColorTypeChange
    });
    if (prevFilterReasonView === null) {
      render(this.#filterReasonView, this.#container, RenderPosition.AFTERBEGIN);
      // return;
    } else if (prevFilterColorView === null) {
      render(this.#filterColorView, this.#container, RenderPosition.AFTERBEGIN);
    }
    replace(this.#filterColorView, prevFilterColorView);
    remove(prevFilterColorView);
    replace(this.#filterReasonView, prevFilterReasonView);
    remove(prevFilterReasonView);
  }

  #handleModelEvent = () => {
    this.renderFilters();
  };

  #handleFilterReasonTypeChange = (filterReasonType) => {
    if (this.#filtersModel.filter === filterReasonType) {
      return;
    }

    this.#filtersModel.filter = filterReasonType;
  };

  #handleFilterColorTypeChange = (filterColorType) => {
    if (this.#filtersModel.filter === filterColorType) {
      return;
    }

    this.#filtersModel.filter = filterColorType;
  };
}
