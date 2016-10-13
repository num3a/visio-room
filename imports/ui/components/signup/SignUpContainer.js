import React, { Component } from 'react';
import SignUp from './SignUp';
import { Accounts } from 'meteor/accounts-base';
//import Meteor from 'meteor/meteor';
import { Router, browerHistory } from 'react-router';
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

    _handleSignUp() {
        let canRedirect = false;
        Accounts.createUser({ email: 'erndedddddddzeaddst.emmanuel@hotmail.fr', password: 'tobeskin', profile: {
            lastName: 'Ernest',
            firstName: 'Emmanuel'
        }}, (error) => {
            if(error){
                console.error('An error occured', error);
            }
            else{
                canRedirect = true;
            }

            if(canRedirect){
                browerHistory.push('/');
            }
        });
    }
    _handleOAuth() {
        let canRedirect = false;

        Meteor.loginWithLinkedin({}, (error)=> {
            if(error){
                console.log('oauth error', error);
            }
            else{
                canRedirect = true;
            }

            if(canRedirect){
                browerHistory.push('/');
            }
        });
    }
    render() {
        return(
            <div>
                <SignUp
                    onEmailChange={(email) => this.setState({ email: email})}
                    onPasswordChange={(password) =>  this.setState({password: password})}
                    onConfirmChange={() => {}}
                    onSignUpClick={() => this._handleSignUp()}
                    onOAuthClick={() => this._handleOAuth()}
                />
            </div>
        );
    }
}

export default SignUpContainer = createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, Container);
