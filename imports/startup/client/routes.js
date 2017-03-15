import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect,  withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { PrivateRoute, AdminRoute } from './RoutesHelpers';

// route components
import ProfileContainer from '../../ui/components/Profile';
import AppContainer from '../../ui/components/AppContainer';
import AdministrationContainer from '../../ui/components/Administration';
import HomeContainer from '../../ui/components/Home/HomeContainer';
import RoomDetailsContainer from '../../ui/components/RoomDetails';
import DiscoverContainer from '../../ui/components/Discover';
import PaymentsContainer from '../../ui/components/Payments';
import SignUpContainer from '../../ui/components/Signup';
import LogInContainer from '../../ui/components/Login';
import LogOutContainer from '../../ui/components/Logout';

//Import pages
import NotFoundPage from '../../ui/pages/NotFoundPage';
import NotAuthorized from '../../ui/pages/NotAuthorized';
import CGU from '../../ui/pages/CGU';
import Legal from '../../ui/pages/Legal';
import About from '../../ui/pages/About';

const history = createHistory();
const App = withRouter(AppContainer);

export const renderRoutes = () => (
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={HomeContainer} />
                <AdminRoute exact path="/administration" component={AdministrationContainer} />

                <PrivateRoute path="/rooms/:roomId" component={RoomDetailsContainer} />
                <PrivateRoute path="/profile" component={ProfileContainer} />
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