import * as types from './actionTypes';

const notificationOpen = message => ({
  type: types.NOTIFICATION_OPEN,
  notificationType: 'is-info',
  message,
});

const notificationOpenSuccess = message => ({
  type: types.NOTIFICATION_OPEN_SUCCESS,
  notificationType: 'is-success',
  message,
});

const notificationOpenError = message => ({
  type: types.NOTIFICATION_OPEN_ERROR,
  notificationType: 'is-danger',
  message,
});

const notificationOpenWarning = message => ({
  type: types.NOTIFICATION_OPEN_WARNING,
  notificationType: 'is-warning',
  message,
});

const notificationClose = () => ({
  type: types.NOTIFICATION_CLOSE,
});

const notificationMessageChanged = message => ({
  type: types.NOTIFICATION_MESSAGE_CHANGED,
  message,
});

export {
  notificationOpen,
  notificationOpenWarning,
  notificationOpenError,
  notificationOpenSuccess,
  notificationClose,
  notificationMessageChanged,
};
