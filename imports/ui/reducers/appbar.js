import * as types from '../actions/actionTypes';

const initialState = {
    openLoginModal: false,
};

const appBarReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.APPBAR_OPEN_LOGIN_MODAL:
            return {
                ...state,
                openLoginModal: action.openLoginModal
            };

        default:
            return state;
    }
};

export default appBarReducer;
