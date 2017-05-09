import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { closeLoginModal } from '../../actions/login';
import LogIn from './Login';
// TODO: add meteor data system

class Container extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
      redirectToReferrer: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.props.history.push('/');
    }
  }

  onLoginFormSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log(error.reason);
        this.setState({ errorMessage: error.reason });
      }  else if (this.props.isModal) {
        const { dispatch } = this.props;
        dispatch(closeLoginModal());
      } else {
        this.redirectToReferrer();
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
      } else if (this.props.isModal) {
        const { dispatch } = this.props;
        dispatch(closeLoginModal());
      } else {
        this.redirectToReferrer();
      }
    });
  }
  render() {
    if (this.props.isModal) {
      return (<div>
        <LogIn
          onLoginFormSubmit={event => this.onLoginFormSubmit(event)}
          onOAuthClick={() => this._handleOAuth()}
          errorMessage={this.state.errorMessage}
        />
      </div>);
    }

    return (
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-6 is-offset-3">
            <LogIn
              isModal={this.props.isModal}
              onLoginFormSubmit={event => this.onLoginFormSubmit(event)}
              onOAuthClick={() => this._handleOAuth()}
              errorMessage={this.state.errorMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

const LoginContainer = createContainer(() => ({
  currentUser: Meteor.user(),
}), Container);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(LoginContainer);
