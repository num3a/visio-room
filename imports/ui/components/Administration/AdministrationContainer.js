import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import { Roles } from 'meteor/alanning:roles';
import RoomSelector from './RoomSelector';
import BookingManager from './BookingManager';
import AdminLeftMenu from "./AdminLeftMenu";
import {BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { AutoFormPartnerCreation, PartnerCreation } from './components/Partners';

class Administration extends Component {


    render(){
        const RoomManager = () =>(<div><RoomSelector/><BookingManager roomId={this.props.selectedRoomId} /></div>);
        const MockParterns = () => (<div className="is-title is-3">Hello friend</div>);

        return <Router
            basename="/admin">
            <div className="container">
                <div className="columns">
                    <div className="column is-3">
                        <AdminLeftMenu/>
                    </div>
                    <div className="column is-9">
                        <Switch>
                            <Route path="/home" component={RoomManager} />
                            <Route path="/partners" exact={true} component={MockParterns} />
                            <Route path="/partners/creation" component={AutoFormPartnerCreation} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>;
    }
}

const AdministrationContainer = createContainer(() => {
    let admin = Roles.userIsInRole(Meteor.userId(),'super-admin');
    let superAdmin = Roles.userIsInRole(Meteor.userId(),'super-admin');

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
    };
}, Administration);

const mapStateToProps = (state) => {

    return {
        selectedRoomId: state.admin.roomId,
    };
};

export default connect(mapStateToProps)(AdministrationContainer);