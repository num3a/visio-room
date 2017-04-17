import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import BookingList from './BookingList';

import SearchBarContainer from './SearchBar';
import { Bookings } from '../../../api/bookings/bookings';

class Home extends Component {
  constructor() {
    super();
    this.state = { selectedDate: new Date() };
  }

  selectedDateChanged(newSelectedDate) {
    this.setState({ selectedDate: newSelectedDate });
  }

  render() {
    return (
      <div className="container">
        <SearchBarContainer
          count={this.props.bookings.length}
        />
        <BookingList
          currentUser={this.props.currentUser}
          loading={this.props.loading}
          bookings={this.props.bookings}
        />
      </div>
    );
  }
}

const HomeContainer = createContainer((props) => {

  const search = {
    bookingDate: props.selectedDate.toDate(),
    capacity: props.capacity,
  };

  const bookingsHandle = Meteor.subscribe('bookings.search', search);
  const loading = !bookingsHandle.ready();
  const bookings = Bookings.find({}).fetch();

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    bookings: bookings || [],
    loading,
  };
}, Home);


const mapStateToProps = state => ({
  selectedDate: state.booking.selectedDate,
  capacity: state.booking.capacity,
});

export default connect(mapStateToProps)(HomeContainer);
