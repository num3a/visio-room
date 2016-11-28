import React, { Component } from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginContainer from '../Login/LogInContainer';
import SignUpContainer from '../Signup/SignUpContainer';
import {Tabs, Tab} from 'material-ui/Tabs';


import { closeLoginModal } from '../../actions/appbar';
class AuthenticationModal extends Component {
    _onRequestClose(){
        const { dispatch } = props;
        dispatch(closeLoginModal());
    }

    render() {

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={() => this._onRequestClose()}
            />
        ];

        return (
            <Dialog
                actions={actions}
                modal={true}
                open={this.props.openLoginModal}
                style={{height: 400}}
                autoDetectWindowHeight
                onRequestClose={() => this._onRequestClose()}
            >

                <Tabs>
                    <Tab label="Login">
                        <LoginContainer/>
                    </Tab>
                    <Tab label="Sign Up">
                        <SignUpContainer/>
                    </Tab>
                </Tabs>
            </Dialog>

        );

    }
}
const mapStateToProps = (state) => {
    return {
        openLoginModal: state.appbar.openLoginModal,
    };
};

export default connect(mapStateToProps)(AuthenticationModal);