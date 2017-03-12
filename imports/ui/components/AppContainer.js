import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import VisioRoomDrawer from './Drawer/Drawer';
import VisioRoomAppBar from './AppBar/AppBar';
import AuthenticationModal from './Modal/AuthenticationModal';
import RoomBookingModal from './Modal/RoomBookingModal';
import AddPaymentModal from './Modal/AddPaymentModal';
import ForgotPasswordModal from './Modal/ForgotPasswordModal';

import ErrorMessageSnackBar from './SnackBar/ErrorMessageSnackBar';

import './app.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VisioRoomTheme from '../theme/VisioRoomTheme';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import VisioRoomReducers from '../reducers';

injectTapEventPlugin();
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(VisioRoomReducers);

class AppContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme(VisioRoomTheme)}>
                    <div>
                        <VisioRoomAppBar/>
                        <VisioRoomDrawer />
                        {this.props.children}
                        <AuthenticationModal />
                        <RoomBookingModal />
                        <AddPaymentModal />
                        <ForgotPasswordModal/>
                        <ErrorMessageSnackBar />
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default AppContainer;