import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import { Roles } from 'meteor/alanning:roles';
import RoomSelector from './RoomSelector';
import BookingManager from './BookingManager';
import AdminLeftMenu from './AdminLeftMenu';

class Administration extends Component {

    render(){
        return <div className="container">
                <div className="columns">
                    <div className="column is-3">
                        <AdminLeftMenu/>
                    </div>
                    <div className="column is-9">
                        {this.props.children}
                    </div>
                </div>
            </div>;
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