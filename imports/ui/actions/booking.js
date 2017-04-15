import * as types from './actionTypes';

const openBookingModal = () => {
  return {
    type: types.BOOKING_OPEN_BOOKING_MODAL,
    openBookingModal: true
  };
};

const closeBookingModal = () => {
  return {
    type: types.BOOKING_OPEN_BOOKING_MODAL,
    openBookingModal: false
  };
};

const selectedBookingChanged = (bookingId) => {
  return {
    type: types.BOOKING_SELECTED_BOOKING_CHANGED,
    bookingId:bookingId,
  };
};

const selectedVoucherChanged = (voucher) => {
  return {
    type: types.BOOKING_SELECTED_VOUCHER_CHANGED,
    voucher: voucher,
  };
};

const voucherIsValid = (isValid) => {
  return {
    type: types.BOOKING_VOUCHER_IS_VALID,
    isValid: isValid,
  };
};

const cguAccepted = (accepted) => {
  return {
    type: types.BOOKING_CGU_ACCEPTED,
    accepted: accepted,
  };
};

const selectedCardChanged = (card) => {
  return {
    type: types.BOOKING_SELECTED_CARD_CHANGED,
    card: card,
  };
};

const toggleAvailability = () => {
  return {
    type: types.BOOKING_TOGGLE_AVAILABILITY,
  };
};

const resetAvailability = () => {
  return {
    type: types.BOOKING_RESET_AVAILABILITY,
  }
};

export {
  openBookingModal,
  closeBookingModal,
  selectedBookingChanged,
  selectedVoucherChanged,
  voucherIsValid,
  cguAccepted,
  selectedCardChanged,
  toggleAvailability,
  resetAvailability
}