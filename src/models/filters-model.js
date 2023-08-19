import { FilterColorType, FilterReasonType } from '../utils/const.js';
import Observable from '../framework/observable.js';

export default class FiltersModel extends Observable {
  #filterColor = FilterColorType.ALL;
  #filterReason = FilterReasonType.ALL;

  get filter() {
    return this.#filterColor, this.#filterReason;
  }

  set filter(filterColor, FilterReson) {
    this.#filterColor = filterColor;
    this.#filterReason = filterReason
    this._notify('filterChanged', filter);
  }
}