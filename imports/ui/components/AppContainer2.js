import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import VisioRoomDrawer from './Drawer/Drawer';
import VisioRoomAppBar from './AppBar/AppBar';
import LoginModal from './Login/LoginModal';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <VisioRoomAppBar/>
                        <VisioRoomDrawer />
                        {this.props.children}
                        <LoginModal />
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default AppContainer;