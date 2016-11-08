import React, { Component } from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginContainer2 from './LogInContainer2';

import { openLoginModal } from '../../actions/appbar';
class LoginModal extends Component {
    render() {
        return (
            <Dialog
                title="Login"
                modal={true}
                open={this.props.openLoginModal}
            >
                <LoginContainer2/>
            </Dialog>

        );

    }
}
const mapStateToProps = (state) => {
    return {
        openLoginModal: state.appbar.openLoginModal,
    };
};

export default connect(mapStateToProps)(LoginModal);