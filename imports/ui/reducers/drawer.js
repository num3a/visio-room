import * as types from '../actions/actionTypes';

const initialState = {
    tabName: 'home',
    isOpen: false,
};

const drawerReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.TAB_CHANGE:
            return {
                ...state,
                tabName: action.tabName
            };
        case types.DRAWER_TOGGLE:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case types.DRAWER_CLOSE:
            return {
                ...state,
                isOpen: false
            };
        default:
            return state;
    }
};

export default drawerReducer;
