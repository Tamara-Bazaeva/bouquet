import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

export default class FlowersModel extends Observable {
  #bouquets = [];
  #flowersApiService = null;

  constructor(flowersApiService) {
    super();
    this.#flowersApiService = flowersApiService;
  }

  get bouquets() {
    return this.#bouquets;
  }

  async init() {
    const bouquets = await this.#flowersApiService.bouquets;
    if (bouquets.length > 0) {
      this.#bouquets = await this.#mergeWithCart(bouquets);
    }

    this._notify(UpdateType.BOUQUETS_LOADED, this.#bouquets);
  }

  async addToFav(updateType, bouquetId) {
    const index = this.#bouquets.findIndex((bouquet) => bouquet.id === bouquetId);

    if (index === -1) {
      throw new Error('Can\'t update unexisting bouquet');
    }

    try {
      const response = await this.#flowersApiService.addToFav(bouquetId);
      const bouquet = { ...response, images: this.#bouquets[index].images, inCart: this.#bouquets[index].inCart + 1 };
      this.#bouquets = [
        ...this.#bouquets.slice(0, index),
        bouquet,
        ...this.#bouquets.slice(index + 1),
      ];
      this._notify(updateType, bouquet);
    } catch (err) {
      throw new Error('Can\'t update bouquet');
    }
  }

  async removeFromFav(updateType, bouquetId, count = 1) {
    const index = this.#bouquets.findIndex((bouquet) => bouquet.id === bouquetId);

    if (index === -1) {
      throw new Error('Can\'t update unexisting bouquet');
    }

    try {
      for (let i = 0; i < count; i++) {
        await this.#flowersApiService.removeFromFav(bouquetId);
      }

      const bouquet = { ...this.#bouquets[index], inCart: this.#bouquets[index].inCart - count };
      this.#bouquets = [
        ...this.#bouquets.slice(0, index),
        bouquet,
        ...this.#bouquets.slice(index + 1),
      ];
      this._notify(updateType, bouquet);
    } catch (err) {
      throw new Error('Can\'t update bouquet');
    }
  }

  async removeAllFromFav(updateType) {
    try {
      await Promise.all(this.#bouquets.filter((b) => b.inCart > 0).map(async (b) => {
        for (let i = 0; i < b.inCart; i++) {
          await this.#flowersApiService.removeFromFav(b.id);
        }
        b.inCart = 0;
      }));

      this._notify(updateType, this.#bouquets);
    } catch (err) {
      throw new Error('Can\'t remove bouquets');
    }
  }

  async loadAdditionalPics(updateType, bouquetId) {
    const index = this.#bouquets.findIndex((bouquet) => bouquet.id === bouquetId);
    if (index === -1) {
      throw new Error('Can\'t find unexisting bouquet');
    }
    let updatedBouquet = this.#bouquets[index];
    if (updatedBouquet.images) {
      return;
    }
    try {
      const bouquet = await this.#flowersApiService.bouquet(bouquetId);
      updatedBouquet = {
        ...this.#bouquets[index],
        images: bouquet.images
      };
      this.#bouquets = [
        ...this.#bouquets.slice(0, index),
        updatedBouquet,
        ...this.#bouquets.slice(index + 1),
      ];
    } catch (err) {
      throw new Error('Can\'t fetch comments');
    }
    this._notify(updateType, updatedBouquet);
  }

  async #mergeWithCart(bouquets) {
    const cart = await this.#flowersApiService.cart;
    return bouquets.map((bouquet) => {
      const inCart = cart.products && cart.products[bouquet.id] || 0;
      return {
        ...bouquet,
        inCart
      };
    });
  }
}
