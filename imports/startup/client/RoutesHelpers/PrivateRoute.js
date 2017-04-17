import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest} render={props => (
    (!Meteor.loggingIn() && Meteor.userId()) ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    )
  )}
  />
);

export default PrivateRoute;
