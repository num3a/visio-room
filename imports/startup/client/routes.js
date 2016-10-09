import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.js';
/*
 import ListPageContainer from '../../ui/containers/ListPageContainer.js';
 import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
 import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
 */
import NotFoundPage from '../../ui/pages/NotFoundPage.js';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>

            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
);