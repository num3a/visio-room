import * as types from '../actions/actionTypes';

const initialSate = {
    message: '',
};

const messageReducer = (state = initialSate, action = {}) => {
    switch (action.type){
        case types.MESSAGE_CHANGED:
            return {
                ...state,
                message: action.message,
            };
        default:
            return state;
    }
};

export default messageReducer;