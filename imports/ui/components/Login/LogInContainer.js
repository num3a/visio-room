import React, { Component } from 'react';
import LogIn from './Login';
import { Meteor } from 'meteor/meteor';
import { Router, browserHistory} from 'react-router-dom'
import { closeLoginModal } from '../../actions/login';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory'

import { createContainer } from 'meteor/react-meteor-data';
//TODO: add meteor data system

class Container extends Component {
    constructor(){
        super();
        this.state = {
            errorMessage: '',
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentUser){
            this.props.history.push('/');
        }
    }
    onLoginFormSubmit(event){
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        Meteor.loginWithPassword(email, password, (error) => {
            if(error) {
                console.log(error.reason);
                this.setState({errorMessage: error.reason});
            }
            else {
                console.log('No error logging');
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
                <LogIn
                    onLoginFormSubmit={(event) => this.onLoginFormSubmit(event)}
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