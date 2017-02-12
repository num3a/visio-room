import { combineReducers } from 'redux';
import user from './user';
import messaging from './messaging';
import room from './room';
import drawer from './drawer';
import search from './search';
import login from './login';
import payments from './payments';
import booking from './booking';
import snackbar from './snackbar';

const VisioRoomReducers = combineReducers({
    login: login,
    user: user,
    messaging: messaging,
    room: room,
    drawer: drawer,
    search: search,
    payments: payments,
    booking: booking,
    snackbar: snackbar,
});

export default VisioRoomReducers;