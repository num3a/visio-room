import moment from 'moment';
import * as types from '../actions/actionTypes';

const initialSate = {
  roomId: '',
  bookingId: null,
  bookingList: [],
  openBookingModal: false,
  voucher: null,
  voucherIsValid: false,
  cguAccepted: false,
  selectedCard: null,
  toggleAvailability: false,
  selectedStartDate: moment().add(1, 'days').set({ hour: 0, minutes: 0, second: 0, millisecond: 0 }),
  selectedEndDate: moment().add(1, 'days').set({ hour: 0, minutes: 0, second: 0, millisecond: 0 }),
  capacity: 1,
  loadingCompleteBooking: false,
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
    case types.BOOKING_SELECTED_START_DATE_CHANGED:
      return {
        ...state,
        selectedStartDate: action.date,
      };
    case types.BOOKING_SELECTED_END_DATE_CHANGED:
      return {
        ...state,
        selectedEndDate: action.date,
      };
    case types.BOOKING_SELECTED_CAPACITY_CHANGED:
      return {
        ...state,
        capacity: action.capacity,
      };
    case types.BOOKING_ADD_TO_BOOKING_LIST:
      return {
        ...state,
        bookingIds: [...state.bookingList, action.bookingList],
      };
    case types.BOOKING_UPDATE_BOOKING_LIST:
      return {
        ...state,
        bookingList: [...action.bookingList],
      };
    case types.BOOKING_REMOVE_FROM_BOOKING_LIST:
      return {
        ...state,
        bookingList: [],
      };
    case types.BOOKING_COMPLETE_LOADING:
      return {
        ...state,
        loadingCompleteBooking: action.loading,
      };
    default:
      return state;
  }
};

export default roomReducer;
