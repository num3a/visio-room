import * as types from '../actions/actionTypes';

const initialSate = {
    roomId: '',
};

const roomReducer = (state = initialSate, action = {}) => {
    switch (action.type){
        case types.SELECTED_ROOM_CHANGED:
            return {
                ...state,
                roomId: action.roomId,
            };
        default:
            return state;
    }
};

export default roomReducer;