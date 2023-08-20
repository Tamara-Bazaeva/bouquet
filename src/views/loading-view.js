import AbstractView from '../framework/view/abstract-view.js';

function loadingTemplate() {
  return `<div class="message catalogue__no-items">
                <p class="text text--align-center message__text">Загрузка букетов...</p>
            </div>`;
}

export default class LoadingView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return loadingTemplate();
  }
}
