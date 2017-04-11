import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import ReactGA from 'react-ga';

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
    <Route {...rest} render={props => {
        let userId = Meteor.userId();
        let isAdmin = Roles.userIsInRole(userId,'admin');
        debugger;

      //  (isAdmin && !Meteor.loggingIn()) ? (
        (1 === 1) ? (
                React.createElement(component, props)
            ) : (
                <Redirect to={{
                    pathname: '/unauthorized',
                }}/>
            )
    }}/>
);

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
    )}/>
);

const LogPageView = (location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
    debugger;
};

export {
    PrivateRoute,
    AdminRoute,
    RouteWithSubRoutes,
    LogPageView
}