import moment from 'moment';
import * as types from '../actions/actionTypes';

const initialSate = {
  roomId: '',
  bookingId: null,
  openBookingModal: false,
  voucher: null,
  voucherIsValid: false,
  cguAccepted: false,
  selectedCard: null,
  toggleAvailability: false,
  selectedDate: moment(),
};

// TODO: expose method to reset state on route leave

const roomReducer = (state = initialSate, action = {}) => {
  switch (action.type) {
    case types.BOOKING_OPEN_BOOKING_MODAL:
      return {
        ...state,
        openBookingModal: action.openBookingModal,
      };
    case types.BOOKING_SELECTED_BOOKING_CHANGED:
      return {
        ...state,
        bookingId: action.bookingId,
      };
    case types.BOOKING_SELECTED_VOUCHER_CHANGED:
      return {
        ...state,
        voucher: action.voucher,
      };
    case types.BOOKING_VOUCHER_IS_VALID:
      return {
        ...state,
        voucherIsValid: action.isValid,
      };
    case types.BOOKING_CGU_ACCEPTED:
      return {
        ...state,
        cguAccepted: action.accepted,
      };
    case types.BOOKING_SELECTED_CARD_CHANGED:
      return {
        ...state,
        selectedCard: action.card,
      };
    case types.BOOKING_TOGGLE_AVAILABILITY:
      return {
        ...state,
        toggleAvailability: !state.toggleAvailability,
      };
    case types.BOOKING_RESET_AVAILABILITY:
      return {
        ...state,
        toggleAvailability: false,
      };
    case types.BOOKING_SELECTED_DATE_CHANGED:
      return {
        ...state,
        selectedDate: action.date,
      };
    default:
      return state;
  }
};

export default roomReducer;
