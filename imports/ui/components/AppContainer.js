import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { PropTypes } from 'prop-types';

import AuthenticationModal from './Modal/AuthenticationModal';
import AddPaymentModal from './Modal/AddPaymentModal';
import ForgotPasswordModal from './Modal/ForgotPasswordModal';
import NavBarContainer from './NavBar/NavBarContainer';
import NotificationContainer from './Notification/NotificationContainer';
import { FooterContainer } from './Footer';

import VisioRoomReducers from '../reducers';

import './app.css';

injectTapEventPlugin();

const logger = createLogger();
const middleware = [logger];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(VisioRoomReducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware),
));


// const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
// Òconst store = createStoreWithMiddleware(VisioRoomReducers);

const AppContainer = props => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <NavBarContainer />
      <div className="section main">
        <NotificationContainer />
        {props.children}
        <AuthenticationModal />
        <AddPaymentModal />
        <ForgotPasswordModal />
      </div>
      <FooterContainer />
    </div>
  </Provider>
);

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppContainer;
