import AbstractView from '../framework/view/abstract-view.js';

function notFoundTemplate() {
  return `<div class="message catalogue__no-items">
              <p class="text text--align-center message__text">Извините, по вашему запросу букетов не найдено</p>
            </div>`;
}

export default class NotFoundView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return notFoundTemplate();
  }
}
