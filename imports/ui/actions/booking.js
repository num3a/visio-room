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

const selectedStartDateChanged = date => ({
  type: types.BOOKING_SELECTED_START_DATE_CHANGED,
  date,
});

const selectedEndDateChanged = date => ({
  type: types.BOOKING_SELECTED_END_DATE_CHANGED,
  date,
});

const selectedCapacityChanged = capacity => ({
  type: types.BOOKING_SELECTED_CAPACITY_CHANGED,
  capacity,
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
  selectedStartDateChanged,
  selectedEndDateChanged,
  selectedCapacityChanged,
};
