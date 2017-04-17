import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component, ...rest }) => (
  <Route
    {...rest} render={(props) => {
      const userId = Meteor.userId();
      const isAdmin = Roles.userIsInRole(userId, 'admin');

    //  (isAdmin && !Meteor.loggingIn()) ? (
      (1 === 1) ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/unauthorized',
        }}
      />
    );
    }}
  />
);

export default AdminRoute;

