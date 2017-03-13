import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        Meteor.userId() ? (
                React.createElement(component, props)
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
            )
    )}/>
);

const AdminRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        Roles.userIsInRole(Meteor.userId(),'admin') ? (
                React.createElement(component, props)
            ) : (
                <Redirect to={{
                    pathname: '/unauthorized',
                }}/>
            )
    )}/>
);


export {
    PrivateRoute,
    AdminRoute,
}