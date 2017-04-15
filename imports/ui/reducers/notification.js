import * as types from '../actions/actionTypes';

const initialSate = {
  open: false,
  message: '',
  notificationType: 'is-info',
};

const notificationReducer = (state = initialSate, action = {}) => {
  switch (action.type) {
    case types.NOTIFICATION_MESSAGE_CHANGED:
      return {
        ...state,
        message: action.message,
      };

    case types.NOTIFICATION_OPEN:
      return {
        ...state,
        open: true,
      };

    case types.NOTIFICATION_OPEN_ERROR:
      return {
        ...state,
        open: true,
        notificationType: action.notificationType,
        message: action.message,
      };
    case types.NOTIFICATION_OPEN_WARNING:
    case types.NOTIFICATION_OPEN_SUCCESS:
      return {
        ...state,
        open: true,
        notificationType: action.notificationType,
      };

    case types.NOTIFICATION_CLOSE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
