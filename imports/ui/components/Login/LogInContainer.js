import React, { Component } from 'react';
import LogIn from './LogIn';
import { Accounts } from 'meteor/accounts-base';
//import Meteor from 'meteor/meteor';
import { Router, browserHistory} from 'react-router'

import { createContainer } from 'meteor/react-meteor-data';
//TODO: add meteor data system

class Container extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
        };
    }

    componentWillMount(){
        if(this.props.currentUser){
            browserHistory.push('/');
        }
    }

    _handleLogin(){
        Meteor.loginWithPassword('ernest.emmanuel@hotmail.fr','tobeskin');
        browserHistory.push('/');
    }

    _handleOAuth() {
        Meteor.loginWithLinkedin({}, (error)=> {
            if(error){
                console.log('oauth error', error);
            }
            else {
                console.log('try pop');
                browserHistory.pop();
            }
        });
    }
    render() {
        return(
            <div>
                <LogIn
                    onEmailChange={(email) => this.setState({ email: email})}
                    onPasswordChange={(password) =>  this.setState({password: password})}
                    onLoginClick={this._handleLogin.bind(this)}
                    onOAuthClick={() => this._handleOAuth()}
                />
            </div>
        );
    }
}

export default LoginContainer = createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, Container);
