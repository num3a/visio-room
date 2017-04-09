import React from "react";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import ReactGA from 'react-ga';

import createHistory from 'history/createBrowserHistory';
import { AdminRoute, PrivateRoute, LogPageView} from './RoutesHelpers';
import ScrollToTop from "../../common/ScrollToTop";
// route components
import ProfileContainer from "../../ui/components/Profile";
import AppContainer from "../../ui/components/AppContainer";
import HomeContainer from "../../ui/components/Home/HomeContainer";
import RoomDetailsContainer from "../../ui/components/RoomDetails";
import DiscoverContainer from "../../ui/components/Discover";
import PaymentsContainer from "../../ui/components/Payments";
import SignUpContainer from "../../ui/components/Signup";
import LogInContainer from "../../ui/components/Login";
import LogOutContainer from "../../ui/components/Logout";

// ADMIN
import AdministrationContainer from "../../ui/components/Administration";
import { PartnerCreateOrUpdateForm } from '../../ui/components/Administration/components/Partners';
import { RoomCreateOrUpdateForm } from '../../ui/components/Administration/components/Rooms';

//Import pages
import NotFoundPage from "../../ui/pages/NotFoundPage";
import NotAuthorized from "../../ui/pages/NotAuthorized";
import CGU from "../../ui/pages/CGU";
import Legal from "../../ui/pages/Legal";
import About from "../../ui/pages/About";

ReactGA.initialize('UA-97018244-1');

const history = createHistory();
const AppContainerWithRouter = withRouter(AppContainer);
const ScrollToTopWithRouter = withRouter(ScrollToTop);
const AdminContainerWithRouter = withRouter(AdministrationContainer);

// Get the current location.
const location = history.location

// Listen for changes to the current location.
history.listen((location, action) => {
    // location is an object like window.location
    console.log(action, location.pathname, location.state)
});

export const renderRoutes = () => (
    <Router history={history} onUpdate={LogPageView} >
        <AppContainerWithRouter>
            <ScrollToTopWithRouter>
                <Switch>
                    <Route exact path="/" component={HomeContainer} />

                    <Route path="/rooms/:roomId" component={RoomDetailsContainer} />
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
                    <AdminContainerWithRouter>
                        <Route path="/admin/partners/:partnerId?" match component={PartnerCreateOrUpdateForm}  />
                        <Route path="/admin/rooms/:roomId?" component={RoomCreateOrUpdateForm} />
                    </AdminContainerWithRouter>
                    <Route component={NotFoundPage}/>
                </Switch>
            </ScrollToTopWithRouter>
        </AppContainerWithRouter>
    </Router>
);