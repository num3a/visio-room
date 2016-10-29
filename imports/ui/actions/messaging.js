import * as types from './actionTypes';

const messageChanged = (message) => {
    return {
        type: types.MESSAGE_CHANGED,
        message: message
    };
};

export {
    messageChanged,
}