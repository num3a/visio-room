import React, { Component } from 'react';
import SignUp from './SignUp';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Router, browerHistory } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { closeLoginModal } from '../../actions/login';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

// TODO: add meteor data system

class Container extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.props.history.push('/');
    }
  }


  onSignUpFormSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirm = event.target.confirm.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    if (password !== confirm) {
      this.setState({ errorMessage: 'Please confirm password.' });
      return;
    }

    let canRedirect = false;
    Accounts.createUser({ email,
      password,
      profile: {
        lastName,
        firstName,
      } }, (error) => {
      if (error) {
        console.log('An error occured', error);
        this.setState({ errorMessage: error.reason });
      } else {
        const { dispatch } = this.props;
        canRedirect = true;
      }

      if (canRedirect) {
        this.props.history.push('/');
      }
    });
  }

  redirectToReferrer() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    this.props.history.push(from);
  }

  _handleOAuth() {
    Meteor.loginWithLinkedIn({
    }, (error) => {
      if (error) {
        console.log('oauth error', error);
      } else {
        const { dispatch } = this.props;
        dispatch(closeLoginModal());

        this.redirectToReferrer();
      }
    });
  }

  render() {

    if (this.props.isModal) {
      return (<div>
        <SignUp
          onOAuthClick={() => this._handleOAuth()}
          errorMessage={this.state.errorMessage}
          onSignUpFormSubmit={event => this.onSignUpFormSubmit(event)}
        />
      </div>);
    }

    return (
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-6 is-offset-3">
            <SignUp
              onOAuthClick={() => this._handleOAuth()}
              errorMessage={this.state.errorMessage}
              onSignUpFormSubmit={event => this.onSignUpFormSubmit(event)}
            />
          </div>
        </div>
      </div>);
  }
}

const SignUpContainer = createContainer(() => ({
  currentUser: Meteor.user(),
}), Container);


const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SignUpContainer);
