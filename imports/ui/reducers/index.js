import { combineReducers } from 'redux';
import user from './user';
import messaging from './messaging';
import room from './room';
import drawer from './drawer';
import search from './search';

const VisioRoomReducers = combineReducers({
    user: user,
    messaging: messaging,
    room: room,
    drawer: drawer,
    search: search,
});

export default VisioRoomReducers;