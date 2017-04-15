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
import admin from './admin';
import accounts from './accounts';
import navbar from './navbar';
import notification from './notification';

const VisioRoomReducers = combineReducers({
  login,
  user,
  messaging,
  room,
  drawer,
  search,
  payments,
  booking,
  snackbar,
  admin,
  accounts,
  navbar,
  notification,
});

export default VisioRoomReducers;
