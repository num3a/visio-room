import * as types from './actionTypes';

const openBookingModal = () => ({
  type: types.BOOKING_OPEN_BOOKING_MODAL,
  openBookingModal: true,
});

const closeBookingModal = () => ({
  type: types.BOOKING_OPEN_BOOKING_MODAL,
  openBookingModal: false,
});

const selectedBookingChanged = bookingId => ({
  type: types.BOOKING_SELECTED_BOOKING_CHANGED,
  bookingId,
});

const selectedVoucherChanged = voucher => ({
  type: types.BOOKING_SELECTED_VOUCHER_CHANGED,
  voucher,
});

const voucherIsValid = isValid => ({
  type: types.BOOKING_VOUCHER_IS_VALID,
  isValid,
});

const cguAccepted = accepted => ({
  type: types.BOOKING_CGU_ACCEPTED,
  accepted,
});

const selectedCardChanged = card => ({
  type: types.BOOKING_SELECTED_CARD_CHANGED,
  card,
});

const toggleAvailability = () => ({
  type: types.BOOKING_TOGGLE_AVAILABILITY,
});

const resetAvailability = () => ({
  type: types.BOOKING_RESET_AVAILABILITY,
});

const selectedDateChanged = date => ({
  type: types.BOOKING_SELECTED_DATE_CHANGED,
  date,
});
export {
  openBookingModal,
  closeBookingModal,
  selectedBookingChanged,
  selectedVoucherChanged,
  voucherIsValid,
  cguAccepted,
  selectedCardChanged,
  toggleAvailability,
  resetAvailability,
  selectedDateChanged,
};
