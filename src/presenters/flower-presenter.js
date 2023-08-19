import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../utils/const.js';
import CardView from '../views/card-view.js';

export default class FlowerPresenter {
  #mode = Mode.GALLERY;
  #flowersListContainer = null;
  #flower = null;
  #cardView = null;
  #popupView = null;

  constructor({ flowersListContainer }){
    this.#flowersListContainer = flowersListContainer;
  }

  init(flower) {
    this.#flower = flower;
    const prevCardView = this.#cardView;
    // const prevPopupView = this.#popupView;

    this.#cardView = new CardView({ flower });
    // this.#popupView = new PopupView({ flower });

    if (prevCardView === null) {
      render(this.#cardView, this.#flowersListContainer);
    } else {
      replace(this.#cardView, prevCardView);
    }
    remove(prevCardView);
  }
}
