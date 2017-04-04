import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        (!Meteor.loggingIn() && Meteor.userId())? (
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

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
    )}/>
);



export {
    PrivateRoute,
    AdminRoute,
    RouteWithSubRoutes,
}