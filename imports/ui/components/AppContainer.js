import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { PropTypes } from 'prop-types';

import AuthenticationModal from './Modal/AuthenticationModal';
import RoomBookingModal from './Modal/RoomBookingModal';
import AddPaymentModal from './Modal/AddPaymentModal';
import ForgotPasswordModal from './Modal/ForgotPasswordModal';
import NavBarContainer from './NavBar/NavBarContainer';
import NotificationContainer from './Notification/NotificationContainer';
import { FooterContainer } from './Footer';

import VisioRoomTheme from '../theme/VisioRoomTheme';
import VisioRoomReducers from '../reducers';

import './app.css';

injectTapEventPlugin();
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(VisioRoomReducers);

const AppContainer = props => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(VisioRoomTheme)}>
      <div style={{ height: '100%' }}>
        <NavBarContainer />
        <div className="section main">
          <NotificationContainer />
          {props.children}
          <AuthenticationModal />
          <RoomBookingModal />
          <AddPaymentModal />
          <ForgotPasswordModal />
        </div>
        <FooterContainer />
      </div>
    </MuiThemeProvider>
  </Provider>
);

AppContainer.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AppContainer;
