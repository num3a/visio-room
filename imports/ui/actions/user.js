import * as types from './actionTypes';

const usernameChanged = (username) => {
    return {
        type: types.USER_NAME_CHANGED,
        username: username
    };
};

export {
    usernameChanged,
}