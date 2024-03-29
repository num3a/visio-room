import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import _ from 'lodash';

import RoomList from './RoomList';
import SearchBarContainer from './SearchBar';
import { Bookings } from '../../../api/bookings/bookings-collection';
import { Rooms } from '../../../api/rooms/rooms-collection';

class Home extends Component {
  constructor() {
    super();
    this.state = { selectedDate: new Date() };
  }

  selectedDateChanged(newSelectedDate) {
    this.setState({ selectedDate: newSelectedDate });
  }

  // async
  render() {
   // const SearchBarContainer = await import('./SearchBar');
    // const RoomList = await import('./RoomList');

    return (
      <div className="container">
        <SearchBarContainer
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

const HomeContainer = createContainer((props) => {
  console.log('props.selectedStartDate', props.selectedStartDate.toDate());
  console.log('props.selectedEndDate', props.selectedStartDate.toDate());

  const startDate = props.selectedStartDate ? props.selectedStartDate.toDate() : moment().toDate();
  const endDate = props.selectedEndDate ? props.selectedEndDate.toDate() : null;
  const search = {
    startDate,
    endDate,
    capacity: props.capacity,
  };

  const bookingsHandle = Meteor.subscribe('bookings.searchWithDates', search);
  const roomHandle = Meteor.subscribe('bookings.availableRoomIds', search);

  const loadingBooking = !bookingsHandle.ready();
  const loadingRooms = !roomHandle.ready();

  const bookings = Bookings.find({}).fetch();
  const rooms = Rooms.find({}).fetch();

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    bookings: bookings || [],
    loadingBooking,
    loadingRooms,
    rooms: rooms || [],
  };
}, Home);


const mapStateToProps = state => ({
  selectedStartDate: state.booking.selectedStartDate,
  selectedEndDate: state.booking.selectedEndDate,
  capacity: state.booking.capacity,
});

export default connect(mapStateToProps)(HomeContainer);
