// Импорт вендоров и утилит, не удаляйте его
import './vendor';
import { ImageSlider } from './utils/image-slider';
import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modals/init-modals';
import FlowersApiService from './services/api.js';
import FlowersModel from './models/flowers-model.js';
import MainPresenter from './presenters/main-presenter.js';

// Ваши импорты...
const ENDPOINT = 'https://grading.objects.pages.academy';
const AUTHORIZATION = 'Basic eo0w590ik2756976a';

// Код для работы попапов, не удаляйте его
window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();

  window.addEventListener('load', () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider('.image-slider');
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  // Пример кода для открытия попапа
  // document
  //   .querySelector('.element-which-is-open-popup')
  //   .addEventListener('click', () => modals.open('popup-data-attr'));

  // Код отработает, если разметка попапа уже отрисована в index.html

  // Если вы хотите рисовать разметку попапа под каждое "открытие",
  // то не забудьте перенесети в код addEventListener инициализацию слайдера

  // ------------

  // Ваш код...
  const flowersApiService = new FlowersApiService(ENDPOINT, AUTHORIZATION);
  const flowersModel = new FlowersModel(flowersApiService);

  const filtersAnchor = document.querySelector('#filters-anchor');
  const sortingAnchor = document.querySelector('#sorting-anchor');
  const galleryAnchor = document.querySelector('.catalogue__list');
  const modalAnchor = document.querySelector('.modal__content');
  const headerAnchor = document.querySelector('.header__container');
  const cartAnchor = document.querySelector('footer');

  new MainPresenter({ filtersAnchor, sortingAnchor, galleryAnchor, modalAnchor, headerAnchor, cartAnchor, flowersModel });
});
