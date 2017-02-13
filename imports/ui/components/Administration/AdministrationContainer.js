import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import { Roles } from 'meteor/alanning:roles';
import RoomSelector from './RoomSelector';
import BookingManager from './BookingManager';

class Administration extends Component {
    render(){
        return <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                <div className="box">
                    <RoomSelector/>
                </div>
            </div>
            <div className="col-xs-9 col-sm-9 col-md-10 col-lg-10">
                <div className="box">
                    <BookingManager
                    roomId={this.props.selectedRoomId}/>
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