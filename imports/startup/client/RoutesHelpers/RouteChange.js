import React, { Component } from 'react';
import { withRouter } from 'react-router';

class RouteChange extends Component {

  componentDidMount () {
    this.routeChanged();
  }

  componentDidUpdate (prevProps) {
    const { location: { pathname } } = this.props;

    if (prevProps.location.pathname === pathname) return;
    this.routeChanged();
  }

  routeChanged () {
    const { location, push, replace, actions } = this.props;

    actions.forEach((action) => {
      action(location, { push, replace });
      debugger;
    });
  }

  render () {
    return null;
  }
}

export default withRouter(RouteChange);
