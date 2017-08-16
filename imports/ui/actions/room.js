import * as types from './actionTypes';

const selectedRoomChanged = roomId => ({
  type: types.SELECTED_ROOM_CHANGED,
  roomId,
});

const openBookingModal = () => ({
  type: types.ROOM_OPEN_BOOKING_MODAL,
  openBookingModal: true,
});

const closeBookingModal = () => ({
  type: types.ROOM_OPEN_BOOKING_MODAL,
  openBookingModal: false,
});

const selectedBookingChanged = bookingId => ({
  type: types.ROOM_SELECTED_BOOKING_CHANGED,
  bookingId,
});

const selectedVoucherChanged = voucher => ({
  type: types.ROOM_SELECTED_VOUCHER_CHANGED,
  voucher,
});

const voucherIsValid = isValid => ({
  type: types.ROOM_VOUCHER_IS_VALID,
  isValid,
});

const cguAccepted = accepted => ({
  type: types.ROOM_CGU_ACCEPTED,
  accepted,
});

export {
  selectedRoomChanged,
  openBookingModal,
  closeBookingModal,
  selectedBookingChanged,
  selectedVoucherChanged,
  voucherIsValid,
  cguAccepted,
};
