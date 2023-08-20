import ApiService from '../framework/api-service.js';

export default class FlowersApiService extends ApiService {

  get bouquets() {
    return this._load({ url: 'flowers-shop/products' })
      .then(ApiService.parseResponse);
  }

  get cart() {
    return this._load({ url: 'flowers-shop/cart' })
      .then(ApiService.parseResponse);
  }

  addToFav(bouquetId) {
    return this._load({ url: `flowers-shop/products/${bouquetId}`, method: 'PUT' })
      .then(ApiService.parseResponse);
  }

  removeFromFav(bouquetId) {
    return this._load({ url: `flowers-shop/products/${bouquetId}`, method: 'DELETE' });
  }

  bouquet(bouquetId) {
    return this._load({ url: `flowers-shop/products/${bouquetId}`, method: 'GET' })
      .then(ApiService.parseResponse);
  }
}
