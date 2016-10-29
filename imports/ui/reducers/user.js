import * as types from '../actions/actionTypes';

const initialSate = {
    username: '',
};

const usernameReducer = (state = initialSate, action = {}) => {
    switch (action.type){
        case types.USER_NAME_CHANGED:
            return {
                ...state,
                username: action.username,
            };
        default:
            return state;
    }
};

export default usernameReducer;