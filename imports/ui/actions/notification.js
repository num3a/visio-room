import * as types from './actionTypes';

const notificationOpen = () => {
    return {
        type: types.NOTIFICATION_OPEN,
        notificationType : 'is-info',
    };
};

const notificationOpenSuccess = () => {
    return {
        type: types.NOTIFICATION_OPEN_SUCCESS,
        notificationType : 'is-success',
    };
};

const notificationOpenError = () => {
    return {
        type: types.NOTIFICATION_OPEN_ERROR,
        notificationType : 'is-danger',
    };
};

const notificationOpenWarning = () => {
    return {
        type: types.NOTIFICATION_OPEN_WARNING,
        notificationType : 'is-warning',
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