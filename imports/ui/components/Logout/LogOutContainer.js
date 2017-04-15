import React, { Component } from 'react';
import { Router } from  'react-router-dom';
import { withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory'

class LogOutContainer extends Component {
  componentWillMount() {
    Meteor.logout();

    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

export default LogOutContainer;