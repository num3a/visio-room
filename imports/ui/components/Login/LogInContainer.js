import React, { Component } from 'react';
import LogIn from './LogIn';
import { Meteor } from 'meteor/meteor';
import { Router, browserHistory} from 'react-router'
import { closeLoginModal } from '../../actions/appbar';
import { connect } from 'react-redux';

import { createContainer } from 'meteor/react-meteor-data';
//TODO: add meteor data system

class Container extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentUser){
            browserHistory.push('/');
        }
    }

    _handleLogin(){
        console.log('login with password');
        Meteor.loginWithPassword(this.state.email,this.state.password, (error) => {
            if(error) {
                console.log(error.reason);
                this.setState({errorMessage: error.reason});
            }
            else {
                console.log('No error logging');
                const { dispatch } = this.props;
                dispatch(closeLoginModal());
                //browserHistory.push('/');
            }
        });

    }

    _onEmailChange(event){
        this.setState({email: event.target.value});
    }
    _onPasswordChange(event){
        this.setState({password: event.target.value});
    }
    _handleOAuth() {
        Meteor.loginWithLinkedin({
        }, (error)=> {
            if(error){
                console.log('oauth error', error);
            }
            else {
                const { dispatch } = this.props;
                dispatch(closeLoginModal());
            }
        });
    }
    render() {
        return(
            <div>
                <LogIn
                    onEmailChange={(event) => this._onEmailChange(event)}
                    onPasswordChange={(event) =>  this._onPasswordChange(event)}
                    onLoginClick={() => this._handleLogin()}
                    onOAuthClick={() => this._handleOAuth()}
                    errorMessage={this.state.errorMessage}
                />
            </div>
        );
    }
}

const LoginContainer = createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, Container);

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(LoginContainer);