import AbstractView from '../framework/view/abstract-view.js';

function showMoreBtnTemplate() {
  return `<div class="catalogue__btn-wrap">
    <button class="btn btn--outlined catalogue__show-more-btn" type="button">больше букетов
    </button>
    <a class="btn-round btn-round--to-top btn-round--size-small catalogue__to-top-btn" type="button" aria-label="наверх" href="#filters-anchor">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </a>
  </div>`;
}

export default class ShowMoreBtnView extends AbstractView {
  constructor({ onShowMoreClick, onTopClick }) {
    super();
    this.element.querySelector('.catalogue__show-more-btn').addEventListener('click', onShowMoreClick);
    this.element.querySelector('.catalogue__to-top-btn').addEventListener('click', onTopClick);
  }

  get template() {
    return showMoreBtnTemplate();
  }
}
