import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { Rooms } from '../../../../../api/rooms/rooms-collection';
import { selectedRoomChanged } from '../../../../actions/admin';
import { getFirstEmail } from '../../../../../common/emailHelper';

class RoomSelector extends Component {

  handleChange(event, index, value) {
    const { dispatch } = this.props;
    dispatch(selectedRoomChanged(value));
  }
  renderRoomList() {
    if (this.props.rooms.length == 0) {
      return <h5>No rooms</h5>;
    }
    const selectedRoom = this.props.selectedRoomId == '' ? 1 : this.props.selectedRoomId;
    return (<select
      value={selectedRoom}
      onChange={(event, index, value) => this.handleChange(event, index, value)}
    >
      <option>Room List</option>
      {this.props.rooms.map(room => <option key={room._id} value={room._id}>{room.name}</option>)}
    </select>);
  }
  render() {
    return (<div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="box">
          <h5>Select a room</h5>
          {this.renderRoomList()}
        </div>
      </div>
    </div>);
  }

}


const RoomSelectorContainer = withTracker(() => {
  const admin = Roles.userIsInRole(Meteor.userId(), 'admin');
  const superAdmin = Roles.userIsInRole(Meteor.userId(), 'super-admin');
  let roomsHandle = null;
  //const email = getFirstEmail(Meteor.user());


  if (superAdmin) {
    roomsHandle = Meteor.subscribe('rooms.all');
  } else {
    // TODO: remove hardcoded email
    roomsHandle = Meteor.subscribe('rooms.byAdmin', 'eernest.pro@gmail.com');
  }
  const rooms = Rooms.find({}).fetch();
  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    loading: !roomsHandle.ready(),
    rooms: rooms || [],
  };
}, RoomSelector);

const mapStateToProps = state => ({
  selectedRoomId: state.admin.roomId,
});

export default connect(mapStateToProps)(RoomSelectorContainer);
