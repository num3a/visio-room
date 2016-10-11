import React, { Component } from 'react';
import SignUp from './SignUp';
import { Accounts } from 'meteor/accounts-base';
//import Meteor from 'meteor/meteor';

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

    _handleSignUp(){
        Accounts.createUser({ email: 'ernest.emmanuel@hotmail.fr', password: 'tobeskin'});
    }

    render() {
        return(
            <div>
                <SignUp
                    onEmailChange={(email) => this.setState({ email: email})}
                    onPasswordChange={(password) =>  this.setState({password: password})}
                    onConfirmChange={() => {}}
                    onSignUpClick={() => this._handleSignUp()}
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
