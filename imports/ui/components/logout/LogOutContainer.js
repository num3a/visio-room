import React, { Component } from 'react';
import { Router, browserHistory } from  'react-router';

class LogOutContainer extends Component {
    componentWillMount() {
        Meteor.logout();
        browserHistory.push('/');
    }

    render() {
        return null;
    }
}

export default LogOutContainer;