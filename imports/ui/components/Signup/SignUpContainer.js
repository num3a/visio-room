import React, { Component } from 'react';
import SignUp from './SignUp';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Router, browerHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { closeLoginModal } from '../../actions/login';
import { connect } from 'react-redux';

//TODO: add meteor data system

class Container extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirm: '',
            errorMessage: '',
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.props.currentUser){
            browserHistory.push('/');
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
                browerHistory.push('/');
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
                    onEmailChange={(event) => this._onEmailChange(event)}
                    onPasswordChange={(event) =>  this._onPasswordChange(event)}
                    onConfirmChange={(event) =>  this._onConfirmPasswordChange(event)}
                    onFirstNameChange={(event) => this._onFirstNameChange(event)}
                    onLastNameChange={(event) => this._onLastNameChange(event)}
                    onSignUpClick={() => this._handleSignUp()}
                    onOAuthClick={() => this._handleOAuth()}
                    errorMessage={this.state.errorMessage}
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