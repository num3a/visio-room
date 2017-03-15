import React, {Component} from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import AuthenticationModal from "./Modal/AuthenticationModal";
import RoomBookingModal from "./Modal/RoomBookingModal";
import AddPaymentModal from "./Modal/AddPaymentModal";
import ForgotPasswordModal from "./Modal/ForgotPasswordModal";
import NavBarContainer from "./NavBar/NavBarContainer";
import ErrorMessageSnackBar from "./SnackBar/ErrorMessageSnackBar";
import Footer from './Footer/Footer';
import "./app.css";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import VisioRoomTheme from "../theme/VisioRoomTheme";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import createLogger from "redux-logger";
import VisioRoomReducers from "../reducers";

injectTapEventPlugin();
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(VisioRoomReducers);

class AppContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme(VisioRoomTheme)}>
                    <div style={{height: '100%'}}>
                        <NavBarContainer />
                        <div className="section main">
                            {this.props.children}

                            <AuthenticationModal />
                            <RoomBookingModal />
                            <AddPaymentModal />
                            <ForgotPasswordModal/>
                           <ErrorMessageSnackBar />
                       </div>
                    <Footer />
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default AppContainer;