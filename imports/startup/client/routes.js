import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// route components
import AppContainer from '../../ui/components/AppContainer';
import HomeContainer from '../../ui/components/home';
import SignUpContainer from '../../ui/components/signup';
import LogInContainer from '../../ui/components/login';

/*
 import ListPageContainer from '../../ui/containers/ListPageContainer.js';
 import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
 import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
 */
import NotFoundPage from '../../ui/pages/NotFoundPage.js';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={HomeContainer} />
            <Route path="/signup" component={SignUpContainer} />
            <Route path="/login" component={LogInContainer} />
            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
);