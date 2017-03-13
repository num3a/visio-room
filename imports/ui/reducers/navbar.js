import * as types from '../actions/actionTypes';

const initialState = {
    openMobileNavBar: false,
};

const navbarReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.NAVBAR_OPEN_MOBILE:
            return {
                ...state,
                openMobileNavBar: action.openMobileNavBar
            };
        case types.NAVBAR_CLOSE_MOBILE:
            return {
                ...state,
                openMobileNavBar: action.openMobileNavBar,
            };
        case types.NAVBAR_TOGGLE_MOBILE :
            return {
                ...state,
                openMobileNavBar: !state.openMobileNavBar,
            };
        default:
            return state;
    }
};

export default navbarReducer;
