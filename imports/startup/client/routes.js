import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// route components
import AppContainer from '../../ui/components/AppContainer';

import HomeContainer from '../../ui/components/Home';
import ProfileContainer from '../../ui/components/Profile';

import AppContainer2 from '../../ui/components/AppContainer2';
import HomeContainer2 from '../../ui/components/Home/HomeContainer2';
import RoomDetailsContainer from '../../ui/components/RoomDetails';


import SignUpContainer from '../../ui/components/Signup';
import LogInContainer from '../../ui/components/Login';
import LogOutContainer from '../../ui/components/Logout';

/*
 import ListPageContainer from '../../ui/containers/ListPageContainer.js';
 import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
 import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
 */
import NotFoundPage from '../../ui/pages/NotFoundPage.js';

const redirectIfLoggedIn = (nextState, replace) => {
    if(Meteor.user()){
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });
    }
};

const requireAuth = (nextState, replace) => {
    if(Meteor.user()) {
        console.log('USER IS LOGGED');
    }
    else {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });

        console.log('USER IS NOT LOGGED')
    }
};

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer2} >
            <IndexRoute component={HomeContainer2} />

            <Route name="authenticatedPages" onEnter={requireAuth}>
                <Route path="rooms/:roomId" component={RoomDetailsContainer} />
                <Route path="profile" component={ProfileContainer} />
            </Route>
            <Route name="nonAuthenticatedPages" onEnter={redirectIfLoggedIn}>
                <Route path="signup" component={SignUpContainer} />
                <Route path="login" component={LogInContainer} />
            </Route>
            <Route path="logout" component={LogOutContainer} />
            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
);