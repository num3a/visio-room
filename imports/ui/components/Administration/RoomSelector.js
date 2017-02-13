import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import { Rooms } from '../../../api/rooms/rooms';
import { selectedRoomChanged } from '../../actions/admin';

class RoomSelector extends Component {

    handleChange(event, index, value) {
        const { dispatch } = this.props;
        dispatch(selectedRoomChanged(value));
    }
    renderRoomList(){
        if(this.props.rooms.length == 0){
            return <h5>No rooms</h5>;
        }
        const selectedRoom = this.props.selectedRoomId == '' ? 1 : this.props.selectedRoomId;
        return     <SelectField
            value={selectedRoom}
            onChange={(event, index, value) => this.handleChange(event, index, value)}
        >
            <MenuItem value={1} primaryText="RoomList" />
            {this.props.rooms.map((room) => <MenuItem key={room._id} value={room._id} primaryText={room.name} />)}
        </SelectField>;

    }
    render()
    {
        return <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="box">
                    <h5>Select a room</h5>
                    {this.renderRoomList()}
                </div>
            </div>
        </div>;
    }

}


const RoomSelectorContainer = createContainer(() => {
    let admin = Roles.userIsInRole(Meteor.userId(),'admin');
    let superAdmin = Roles.userIsInRole(Meteor.userId(),'super-admin');
    let roomsHandle = null;

    if(superAdmin){
        roomsHandle = Meteor.subscribe('rooms.all');
    }
    else {
        roomsHandle = Meteor.subscribe('rooms.byAdmin', Meteor.userId());
    }

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
        loading: !roomsHandle.ready(),
        rooms: Rooms.find({}).fetch() || []
    };
}, RoomSelector);

const mapStateToProps = (state) => {

    return {
        selectedRoomId: state.admin.roomId,
    };
};

export default connect(mapStateToProps)(RoomSelectorContainer);