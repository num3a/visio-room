import * as types from './actionTypes';

const selectedRoomChanged = (roomId) => {
  return {
    type: types.SELECTED_ROOM_CHANGED,
    roomId: roomId
  };
};

const openBookingModal = () => {
  return {
    type: types.ROOM_OPEN_BOOKING_MODAL,
    openBookingModal: true
  };
};

const closeBookingModal = () => {
  return {
    type: types.ROOM_OPEN_BOOKING_MODAL,
    openBookingModal: false
  };
};

const selectedBookingChanged = (bookingId) => {
  return {
    type: types.ROOM_SELECTED_BOOKING_CHANGED,
    bookingId:bookingId,
  };
};

const selectedVoucherChanged = (voucher) => {
  return {
    type: types.ROOM_SELECTED_VOUCHER_CHANGED,
    voucher: voucher,
  };
};

const voucherIsValid = (isValid) => {
  return {
    type: types.ROOM_VOUCHER_IS_VALID,
    isValid: isValid,
  };
};

const cguAccepted = (accepted) => {
  return {
    type: types.ROOM_CGU_ACCEPTED,
    accepted: accepted,
  };
};

export {
  selectedRoomChanged,
  openBookingModal,
  closeBookingModal,
  selectedBookingChanged,
  selectedVoucherChanged,
  voucherIsValid,
  cguAccepted,
}