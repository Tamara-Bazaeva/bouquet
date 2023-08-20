const UpdateType = {
  BOUQUETS_LOADED: 'BOUQUETS_LOADED',
  UPDATE_CARDS: 'UPDATE_CARDS',
  UPDATE_CARD: 'UPDATE_CARD',
  NO_RERENDER: 'NO_RERENDER'
};

const UserAction = {
  ADDED_TO_FAV: 'ADDED_TO_FAV',
  REMOVED_FROM_FAV: 'REMOVED_FROM_FAV',
  ALL_REMOVED_FROM_FAV: 'ALL_REMOVED_FROM_FAV'
};

const Mode = {
  GALLERY: 'GALLERY',
  POPUP: 'POPUP'
};

const FilterReasonType = {
  BIRTHDAY: 'birthdayboy',
  DARLING: 'forlove',
  BRIDE: 'bridge',
  COLLEAGUE: 'colleagues',
  MOTHERDAY: 'motherday'
};

const FilterColorType = {
  RED: 'red',
  WHITE: 'white',
  LILAC: 'lilac',
  YELLOW: 'yellow',
  PINK: 'pink'
};

const SortType = {
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC'
};

const I18N_RU = {
  'birthdayboy': 'именнинику',
  'forlove': 'любимой',
  'bridge': 'невесте',
  'colleagues': 'коллеге',
  'motherday': 'маме'
};

export { UpdateType, Mode, FilterReasonType, FilterColorType, SortType, UserAction, I18N_RU };

