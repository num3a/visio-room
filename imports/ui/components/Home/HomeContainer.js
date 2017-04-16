import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

import RoomList from './RoomList';
import SearchBar from './SearchBar';
import { Rooms } from '../../../api/rooms/rooms';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <SearchBar
          count={this.props.rooms.length}
        />
        <RoomList
          currentUser={this.props.currentUser}
          loading={this.props.loading}
          rooms={this.props.rooms}
        />
      </div>
    );
  }
}

const HomeContainer = createContainer(() => {
  const roomsHandle = Meteor.subscribe('rooms.all');
  const loading = !roomsHandle.ready();
  const rooms = Rooms.find({}).fetch();

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    rooms: rooms || [],
    loading,
  };
}, Home);


const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(HomeContainer);
