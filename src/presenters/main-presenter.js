// import { render, RenderPosition, remove, replace } from '../framework/render.js';
import { UpdateType } from '../utils/const.js';
import FlowerPresenter from './flower-presenter.js';

const PAGE_SIZE = 6;

export default class MainPresenter {
  #flowerPresenters = new Map();
  #flowersListContainer = null;
  #flowersModel = null;
  #lastPage = 1;
  #hasNext = false;
  #displayedFlowers = [];

  constructor({flowersListContainer, flowersModel}) {
    this.#flowersListContainer = flowersListContainer;
    this.#flowersModel = flowersModel;

    this.#flowersModel.addObserver(this.#handleFLowersModelEvent);
    this.#flowersModel.init();

    // render(this.#loadingView, this.#listContainer, RenderPosition.BEFOREBEGIN);
  }

  get flowers() {
    // this.#filterType = this.#filtersModel.filter;

    const allFlowers = this.#flowersModel.flowers;
    const filteredFlowers = [...allFlowers]; // filter[this.#filterType](allFilms);
    const displayedFlowersCounter = this.#lastPage * PAGE_SIZE;
    this.#hasNext = filteredFlowers.length > displayedFlowersCounter;

    const displayedFlowers = filteredFlowers.slice(0, displayedFlowersCounter);
    return displayedFlowers;
  }

  #renderFlowersList = () => {
    this.#displayedFlowers = this.flowers;
    // this.#refresh()

    this.#displayedFlowers.forEach((flower) => {
      this.#renderFlower(flower);
    });
  };

  #renderFlower = (flower) => {
    const flowerPresenter = new FlowerPresenter({ flowersListContainer: this.#flowersListContainer});
    flowerPresenter.init(flower);

    this.#flowerPresenters.set(flower.id, flowerPresenter);
  };

  #renderMain() {
    // sortView
    this.#renderFlowersList();
  }


  #handleFLowersModelEvent = (updateType, flower) => {
    switch (updateType) {
      case UpdateType.FLOWERS_LOADED:
        // remove(this.#loadingView);
        // this.#loadingView = null;

        if (this.#flowersModel.flowers.length === 0) {
          // show no movies available
        } else {
          // this.#renderHeaderView();
          this.#renderMain();
        }
        break;
    }

  };

}
