import React, { Component } from 'react';
import SignUp from './SignUp2';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Router, browerHistory } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { closeLoginModal } from '../../actions/login';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

//TODO: add meteor data system

class Container extends Component {
    constructor(){
        super();
        this.state = {
            errorMessage: '',
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.props.currentUser){
            this.props.history.push('/');
        }
    }

    _onEmailChange(event){
        this.setState({email: event.target.value});
    }
    _onPasswordChange(event){
        this.setState({password: event.target.value});
    }

    _onConfirmPasswordChange(event){
        this.setState({confirm: event.target.value});
    }

    _onFirstNameChange(event){
        this.setState({ firstName: event.target.value});
    }
    _onLastNameChange(event){
        this.setState({ lastName: event.target.value});
    }

    _handleSignUp() {
        if(this.state.password !== this.state.confirm){
            this.setState({errorMessage: 'Please confirm password.'});
            return;
        }

        let canRedirect = false;
        Accounts.createUser({ email: this.state.email, password: this.state.password, profile: {
            lastName: this.state.lastName,
            firstName: this.state.firstName
        }}, (error) => {
            if(error){
                console.log('An error occured', error);
                this.setState({errorMessage: error.reason});

            }
            else{
                const { dispatch } = this.props;
                dispatch(closeLoginModal());
                canRedirect = true;
            }

            if(canRedirect){
                this.props.history.push('/');
            }
        });
    }

    onSignUpFormSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirm = event.target.confirm.value;
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;

        if(password !== confirm){
            this.setState({errorMessage: 'Please confirm password.'});
            return;
        }

        let canRedirect = false;
        Accounts.createUser({ email: email, password: password, profile: {
            lastName: lastName,
            firstName: firstName,
        }}, (error) => {
            if(error){
                console.log('An error occured', error);
                this.setState({errorMessage: error.reason});
            }
            else{
                const { dispatch } = this.props;
                canRedirect = true;
            }

            if(canRedirect){
                this.props.history.push('/');
            }
        });
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
                <SignUp
                    onOAuthClick={() => this._handleOAuth()}
                    errorMessage={this.state.errorMessage}
                    onSignUpFormSubmit={(event) => this.onSignUpFormSubmit(event)}
                />
            </div>
        );
    }
}

const SignUpContainer = createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, Container);


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(SignUpContainer);