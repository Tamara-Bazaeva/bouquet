import ApiService from '../framework/api-service.js';

export default class FlowersApiService extends ApiService {

  get flowers() {
    return this._load({ url: 'flowers-shop/products' })
      .then(ApiService.parseResponse);
  }

}
