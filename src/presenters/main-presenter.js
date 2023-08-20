import { render, RenderPosition, remove, replace } from '../framework/render.js';
import { UpdateType, SortType, UserAction, Mode } from '../utils/const.js';
import BouquetPresenter from './bouquet-presenter.js';
import ErrorView from '../views/error-view.js';
import LoadingView from '../views/loading-view.js';
import NotFoundView from '../views/not-found-view.js';
import FiltersView from '../views/filters-view.js';
import SortView from '../views/sort-view.js';
import ShowMoreBtnView from '../views/show-more-btn-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import HeaderCartView from '../views/header-cart-view.js';
import CartView from '../views/cart-view.js';

const PAGE_SIZE = 6;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class MainPresenter {
  #bouquetPresenters = new Map();
  #filtersAnchor = null;
  #sortingAnchor = null;
  #galleryAnchor = null;
  #modalAnchor = null;
  #headerAnchor = null;
  #cartAnchor = null;
  #flowersModel = null;
  #lastPage = 1;
  #hasNext = false;
  #displayedBouquets = [];
  #loadingView = new LoadingView();
  #sortView = null;
  #filtersView = null;
  #errorView = null;
  #sortType = SortType.PRICE_ASC;
  #colorFilters = [];
  #reasonFilter = null;
  #notFoundView = null;
  #showMoreBtnView = null;
  #bouquetIdInPopupMode = null;
  #headerCartView = null;
  #cartView = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ filtersAnchor, sortingAnchor, galleryAnchor, modalAnchor, headerAnchor, cartAnchor, flowersModel }) {
    this.#filtersAnchor = filtersAnchor;
    this.#sortingAnchor = sortingAnchor;
    this.#galleryAnchor = galleryAnchor;
    this.#modalAnchor = modalAnchor;
    this.#headerAnchor = headerAnchor;
    this.#cartAnchor = cartAnchor;
    this.#flowersModel = flowersModel;
    render(this.#loadingView, this.#filtersAnchor, RenderPosition.BEFOREBEGIN);
    this.#flowersModel.addObserver(this.#handleFlowersModelEvent);
    this.#flowersModel.init().catch(() => {
      remove(this.#loadingView);
      this.#errorView = new ErrorView();
      render(this.#errorView, this.#filtersAnchor, RenderPosition.BEFOREBEGIN);
    });
  }

  #filter(bouquets) {
    let filteredBouquets = bouquets;
    if (this.#reasonFilter !== null) {
      filteredBouquets = filteredBouquets.filter((b) => b.type === this.#reasonFilter);
    }
    if (this.#colorFilters.length > 0) {
      filteredBouquets = filteredBouquets.filter((b) => this.#colorFilters.some((color) => color === b.color));
    }
    return filteredBouquets;
  }

  get bouquets() {
    const bouquets = this.#flowersModel.bouquets;
    const filteredBouquets = this.#filter(bouquets);
    const displayedBouquetsCounter = this.#lastPage * PAGE_SIZE;
    this.#hasNext = filteredBouquets.length > displayedBouquetsCounter;

    const displayedBouquets = filteredBouquets.slice(0, displayedBouquetsCounter);
    switch (this.#sortType) {
      case SortType.PRICE_ASC:
        return displayedBouquets.sort((a, b) => a.price - b.price);
      case SortType.PRICE_DESC:
        return displayedBouquets.sort((a, b) => b.price - a.price);
    }
    return displayedBouquets;
  }

  #renderBouquetList = () => {
    this.#displayedBouquets = this.bouquets;
    this.#refresh();

    this.#displayedBouquets.forEach((bouquet) => {
      this.#renderBouquet(bouquet);
    });
  };

  #refresh() {
    if (this.#hasNext) {
      const prevShowMoreButton = this.#showMoreBtnView;
      this.#showMoreBtnView = new ShowMoreBtnView({ onShowMoreClick: this.#handleShowMoreClick });
      if (prevShowMoreButton) {
        replace(this.#showMoreBtnView, prevShowMoreButton);
      } else {
        render(this.#showMoreBtnView, this.#galleryAnchor, RenderPosition.AFTEREND);
      }
    } else {
      this.#removeShowMoreBtn();
    }

    if (this.#displayedBouquets.length === 0) {
      const prevNotFoundView = this.#notFoundView;
      this.#notFoundView = new NotFoundView();
      if (prevNotFoundView) {
        replace(this.#notFoundView, prevNotFoundView);
      } else {
        render(this.#notFoundView, this.#galleryAnchor, RenderPosition.BEFOREBEGIN);
      }
    } else {
      remove(this.#notFoundView);
      this.#notFoundView = null;
    }
  }

  #renderBouquet = (bouquet) => {
    const bouquetPresenter = new BouquetPresenter({ galleryAnchor: this.#galleryAnchor, modalAnchor: this.#modalAnchor, onModeChange: this.#handleModeChange, onDataChange: this.#handleViewAction });
    bouquetPresenter.init(bouquet);

    this.#bouquetPresenters.set(bouquet.id, bouquetPresenter);
  };

  #renderMain() {
    this.#renderFiltersView();
    this.#renderSortView();
    this.#renderBouquetList();
  }

  #renderFiltersView() {
    const prevFiltersView = this.#filtersView;
    this.#filtersView = new FiltersView({ reasonFilter: this.#reasonFilter, colorFilters: this.#colorFilters, onFilterChange: this.#handleFilterChange });
    if (prevFiltersView === null) {
      render(this.#filtersView, this.#filtersAnchor, RenderPosition.BEFOREBEGIN);
    } else {
      replace(this.#filtersView, prevFiltersView);
    }
  }

  #renderSortView() {
    const prevSortView = this.#sortView;
    this.#sortView = new SortView({ sortType: this.#sortType, onSortTypeChange: this.#handleSortTypeChange });
    if (prevSortView === null) {
      render(this.#sortView, this.#sortingAnchor, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#sortView, prevSortView);
    }
  }

  #clearBouquetList = () => {
    this.#removeShowMoreBtn();

    this.#bouquetPresenters.forEach((presenter) => presenter.destroy());
    this.#bouquetPresenters.clear();
  };

  #removeShowMoreBtn = () => {
    remove(this.#showMoreBtnView);
    this.#showMoreBtnView = null;
  };

  #handleFlowersModelEvent = (updateType, payload) => {
    this.#refreshHeaderCartView();
    switch (updateType) {
      case UpdateType.BOUQUETS_LOADED:
        remove(this.#loadingView);
        this.#loadingView = null;
        if (this.#flowersModel.bouquets.length === 0) {
          this.#notFoundView = new NotFoundView();
          render(this.#notFoundView, this.#filtersAnchor, RenderPosition.BEFOREBEGIN);
        } else {
          this.#renderMain();
        }
        break;
      case UpdateType.UPDATE_CARDS:
        this.#renderMain();
        if (this.#cartView !== null) {
          this.#refreshCartView();
        }
        break;
      case UpdateType.UPDATE_CARD:
        this.#bouquetPresenters.get(payload.id).init(payload);
        if (this.#cartView !== null) {
          this.#refreshCartView();
        }
        break;
      case UpdateType.NO_RERENDER:
        this.#bouquetPresenters.get(payload.id).updateBouquetWithoutRerender(payload);
        break;
    }
  };

  #refreshCartView = () => {
    const prevCartView = this.#cartView;
    this.#cartView = new CartView({ bouquets: this.#flowersModel.bouquets, onInCartChange: this.#handleViewAction, onCloseClick: this.#handleInCartPopupClose });
    if (prevCartView === null) {
      render(this.#cartView, this.#cartAnchor, RenderPosition.BEFOREBEGIN);
    } else {
      replace(this.#cartView, prevCartView);
    }
  };

  #refreshHeaderCartView() {
    const prevHeaderCartView = this.#headerCartView;
    this.#headerCartView = new HeaderCartView({ bouquets: this.#flowersModel.bouquets, onClick: this.#openCartPopup });
    if (prevHeaderCartView === null) {
      render(this.#headerCartView, this.#headerAnchor, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#headerCartView, prevHeaderCartView);
    }
  }

  #openCartPopup = () => {
    document.querySelector('main').classList.add('hidden');
    this.#refreshCartView();
  };

  #handleInCartPopupClose = () => {
    remove(this.#cartView);
    this.#cartView = null;
    document.querySelector('main').classList.remove('hidden');
  };

  #handleViewAction = async (userAction, updateType, payload) => {
    let success = true;
    this.#uiBlocker.block();
    try {
      switch (userAction) {
        case UserAction.ADDED_TO_FAV:
          await this.#flowersModel.addToFav(updateType, payload);
          break;
        case UserAction.REMOVED_FROM_FAV:
          await this.#flowersModel.removeFromFav(updateType, payload.id, payload.count);
          break;
        case UserAction.ALL_REMOVED_FROM_FAV:
          await this.#flowersModel.removeAllFromFav(updateType);
          break;
      }
    } catch (err) {
      success = false;
    } finally {
      this.#uiBlocker.unblock();
    }

    return success;
  };

  #handleFilterChange = ({ reasonFilter, colorFilters }) => {
    this.#lastPage = 1;
    this.#reasonFilter = reasonFilter;
    this.#colorFilters = colorFilters;
    this.#clearBouquetList();
    this.#renderBouquetList();
  };

  #handleSortTypeChange = (sortType) => {
    this.#lastPage = 1;
    this.#sortType = sortType;
    this.#clearBouquetList();
    this.#renderBouquetList();
  };

  #handleShowMoreClick = () => {
    this.#lastPage++;
    this.#clearBouquetList();
    this.#renderBouquetList();
  };

  #handleModeChange = async (bouquetId, mode) => {
    if (mode === Mode.GALLERY) {
      document.querySelector('body').classList.remove('hide-overflow');
      this.#bouquetPresenters.get(bouquetId).switchToGallery();
      this.#bouquetIdInPopupMode = null;
      return;
    }

    await this.#flowersModel.loadAdditionalPics(UpdateType.NO_RERENDER, bouquetId);
    if (this.#bouquetIdInPopupMode !== null) {
      this.#bouquetPresenters.get(this.#bouquetIdInPopupMode).switchToGallery();
    }

    if (bouquetId !== this.#bouquetIdInPopupMode) {
      document.querySelector('body').classList.add('hide-overflow');
      this.#bouquetPresenters.get(bouquetId).switchToPopup();
      this.#bouquetIdInPopupMode = bouquetId;
    } else {
      this.#bouquetIdInPopupMode = null;
    }
  };

}
