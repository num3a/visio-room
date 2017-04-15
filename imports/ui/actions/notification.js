import * as types from './actionTypes';

const notificationOpen = () => {
  return {
    type: types.NOTIFICATION_OPEN,
    notificationType : 'is-info',
    message: message,
  };
};

const notificationOpenSuccess = () => {
  return {
    type: types.NOTIFICATION_OPEN_SUCCESS,
    notificationType : 'is-success',
    message: message,
  };
};

const notificationOpenError = (message) => {
  return {
    type: types.NOTIFICATION_OPEN_ERROR,
    notificationType : 'is-danger',
    message: message,
  };
};

const notificationOpenWarning = () => {
  return {
    type: types.NOTIFICATION_OPEN_WARNING,
    notificationType : 'is-warning',
    message: message,
  };
};

const notificationClose = () => {
  return {
    type: types.NOTIFICATION_CLOSE,
  };
};

const notificationMessageChanged = (message) => {
  return {
    type: types.NOTIFICATION_MESSAGE_CHANGED,
    message: message,
  };
};

export {
  notificationOpen,
  notificationOpenWarning,
  notificationOpenError,
  notificationOpenSuccess,
  notificationClose,
  notificationMessageChanged
}