import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// route components
import AppContainer from '../../ui/components/AppContainer';
import HomeContainer from '../../ui/components/home';
import SignUpContainer from '../../ui/components/signup';
import LogInContainer from '../../ui/components/login';
import LogOutContainer from '../../ui/components/logout';
import ProfileContainer from '../../ui/components/profile';

import AppContainer2 from '../../ui/components/AppContainer2';
import HomeContainer2 from '../../ui/components/home/HomeContainer2';
import RoomDetailsContainer from '../../ui/components/RoomDetails';

/*
 import ListPageContainer from '../../ui/containers/ListPageContainer.js';
 import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
 import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
 */
import NotFoundPage from '../../ui/pages/NotFoundPage.js';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/v2" component={AppContainer2} >
            <IndexRoute component={HomeContainer2} />
            <Route path="rooms/:roomId" component={RoomDetailsContainer} />
            <Route path="*" component={NotFoundPage}/>
        </Route>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={HomeContainer} />
            <Route path="/signup" component={SignUpContainer} />
            <Route path="/login" component={LogInContainer} />
            <Route path="/logout" component={LogOutContainer} />
            <Route path="/profile" component={ProfileContainer} />
            <Route path="*" component={NotFoundPage}/>
        </Route>

    </Router>
);