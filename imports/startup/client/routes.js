import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { PrivateRoute, AdminRoute } from './RoutesHelpers';
// route components

import HomeContainer from '../../ui/components/Home';
import ProfileContainer from '../../ui/components/Profile';

import AppContainer from '../../ui/components/AppContainer';
import AdministrationContainer from '../../ui/components/Administration';
import HomeContainer2 from '../../ui/components/Home/HomeContainer2';
import RoomDetailsContainer from '../../ui/components/RoomDetails';
import HistoryContainer from '../../ui/components/History';
import DiscoverContainer from '../../ui/components/Discover';
import PaymentsContainer from '../../ui/components/Payments';
import SignUpContainer from '../../ui/components/Signup';
import LogInContainer from '../../ui/components/Login';
import LogOutContainer from '../../ui/components/Logout';

/*
 import ListPageContainer from '../../ui/containers/ListPageContainer.js';
 import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
 import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
 */
import NotFoundPage from '../../ui/pages/NotFoundPage';
import NotAuthorized from '../../ui/pages/NotAuthorized';

import CGU from '../../ui/pages/CGU';
import Legal from '../../ui/pages/Legal';
import About from '../../ui/pages/About';

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

const history = createHistory();
/*;
 *  onEnter={() => {
 console.log('ROUTER: on enter');
 }}
 onLeave={() => {
 console.log('ROUTER: on leave');
 }}
 */

const App = withRouter(AppContainer);
/*
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
); */
export const renderRoutes = () => (
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={HomeContainer2} />
                <AdminRoute exact path="/administration" component={AdministrationContainer} />

                <PrivateRoute path="/rooms/:roomId" component={RoomDetailsContainer} />
                <PrivateRoute path="/profile" component={ProfileContainer} />
                <PrivateRoute path="/history" component={HistoryContainer} />
                <PrivateRoute path="/payments" component={PaymentsContainer} />

                <Route path="/signup" component={SignUpContainer} />
                <Route path="/login" component={LogInContainer} />

                <Route path="/cgu" component={CGU} />
                <Route path="/legal" component={Legal} />
                <Route path="/about" component={About} />
                <Route path="/discover" component={DiscoverContainer} />
                <Route path="/logout" component={LogOutContainer} />
                <Route path="/unauthorized" component={NotAuthorized} />
                <Route component={NotFoundPage}/>
            </Switch>
        </App>
    </Router>
);