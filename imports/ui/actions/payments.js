import * as types from './actionTypes';

const openAddCardModal = () => ({
  type: types.PAYMENTS_OPEN_ADD_CARD_MODAL,
  openAddPaymentModal: true,
});

const loadingAddCard = loadingAddCard => ({
  type: types.PAYMENTS_LOADING_ADD_CARD,
  loadingAddCard,
});

const closeAddCardModal = () => ({
  type: types.PAYMENTS_CLOSE_ADD_CARD_MODAL,
  openAddPaymentModal: false,
});


export {
  openAddCardModal,
  closeAddCardModal,
  loadingAddCard,
};
