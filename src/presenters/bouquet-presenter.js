import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { Mode, UpdateType, UserAction } from '../utils/const.js';
import CardView from '../views/card-view.js';
import PopupView from '../views/popup-view.js';
import { modals } from '../modals/init-modals';
import { ImageSlider } from '../utils/image-slider';

export default class BouquetPresenter {
  #mode = Mode.GALLERY;
  #galleryAnchor = null;
  #modalAnchor = null;
  #bouquet = null;
  #cardView = null;
  #popupView = null;
  #handleDataChange = null;
  #handleModeChange = null;

  constructor({ galleryAnchor, modalAnchor, onDataChange, onModeChange }) {
    this.#galleryAnchor = galleryAnchor;
    this.#modalAnchor = modalAnchor;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(bouquet) {
    this.#bouquet = bouquet;
    const prevCardView = this.#cardView;

    this.#cardView = new CardView({ bouquet, onPopupClick: this.#handlePopupClick, onFavoriteClick: this.#handleCardFavoriteClick });

    if (prevCardView === null) {
      render(this.#cardView, this.#galleryAnchor);
    } else {
      replace(this.#cardView, prevCardView);
    }

    remove(prevCardView);
  }

  updateBouquetWithoutRerender(bouquet) {
    this.#bouquet = bouquet;
  }

  destroy() {
    remove(this.#cardView);
    if (this.#mode === Mode.POPUP) {
      remove(this.#popupView);
    }
  }

  switchToGallery = () => {
    modals.close('popup-data-attr');
    remove(this.#popupView);
    this.#popupView = null;
    this.#mode = Mode.GALLERY;
    document.removeEventListener('keyup', this.#handlePopupClose);
  };

  switchToPopup() {
    this.#popupView = new PopupView({ bouquet: this.#bouquet, onFavoriteClick: this.#handlePopupFavoriteClick, onCloseClick: this.#handlePopupClose });
    render(this.#popupView, this.#modalAnchor, RenderPosition.BEFOREEND);

    modals.open('popup-data-attr');
    const imageSlider = new ImageSlider('.image-slider');
    imageSlider.init();
    this.#mode = Mode.POPUP;
    document.addEventListener('keyup', this.#handlePopupClose);
  }

  #handlePopupClick = async () => {
    this.#handleModeChange(this.#bouquet.id, Mode.POPUP);
  };

  #handleCardFavoriteClick = async (addedToFavorite) => this.#handleDataChange(addedToFavorite ? UserAction.ADDED_TO_FAV : UserAction.REMOVED_FROM_FAV, UpdateType.NO_RERENDER,
    addedToFavorite ? this.#bouquet.id : { id: this.#bouquet.id, count: this.#bouquet.inCart }
  );

  #handlePopupFavoriteClick = async (addedToFavorite) => this.#handleDataChange(addedToFavorite ? UserAction.ADDED_TO_FAV : UserAction.REMOVED_FROM_FAV, UpdateType.UPDATE_CARD,
    addedToFavorite ? this.#bouquet.id : { id: this.#bouquet.id, count: this.#bouquet.inCart }
  );

  #handlePopupClose = (evt) => {
    if (evt.type === 'keyup' && evt.key !== 'Escape') {
      return;
    }
    this.#handleModeChange(this.#bouquet.id, Mode.GALLERY);
  };
}
