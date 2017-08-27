import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { staticMarkerImage } from '../../../common/utils/googleMaps';
import Details from './RoomDetails';
import RoomBooking from './RoomBooking';
import AdditionalInfos from './AdditionalInformations';
import { toggleAvailability, resetAvailability, selectedBookingChanged, selectedCardChanged, updateBookingList } from '../../actions/booking';
import { Bookings } from '../../../api/bookings/bookings-collection';
import { Rooms } from '../../../api/rooms/rooms-collection';
import RoomDetailsGallery from './RoomDetailsGallery';

class RoomDetails extends Component {

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetAvailability());
    dispatch(selectedBookingChanged(null));
    dispatch(selectedCardChanged(null));
    dispatch(updateBookingList([]));
  }
  getBigPicture() {
    if (!this.props.room || !this.props.room.location) {
      return '';
    }

    return staticMarkerImage(this.props.room.location[0], this.props.room.location[1], 1000, 1000);
  }

  toggleAvailability() {
    const { dispatch } = this.props;
    dispatch(toggleAvailability());
  }

  renderDetails() {
    return (
      <div className="container">
        <div className="columns">
          <RoomDetailsGallery />
        </div>
      </div>);
  }
  render() {
    if (!this.props.room) {
      return <div />;
    }
    const staticImageUrl = this.getBigPicture();
    return (
      <div className="container">
        <div className="columns">
          <Details
            bigPicture={staticImageUrl}
            description={this.props.room.description}
            name={this.props.room.name}
            pricePerDay={this.props.room.pricePerDay}
            toggle={() => this.toggleAvailability()}
          />
          <RoomBooking
            roomId={this.props.room._id}
          />
        </div>
        <AdditionalInfos
          roomId={this.props.room._id}
        />
      </div>
    );
  }
}

const RoomDetailsContainer = createContainer(({ match }) => {
  debugger;
  const roomHandle = Meteor.subscribe('rooms.byId', match.params.roomId);
  const room = Rooms.findOne(match.params.roomId);

  // const bookingHandle = Meteor.subscribe('bookings.byId', match.params.roomId);
  // const booking = Bookings.findOne(match.params.bookingId);
  // const bookingLoading = !bookingHandle.ready();
  const roomLoading = !roomHandle.ready();

  return {
    //booking,
    room,
    //bookingLoading,
    roomLoading,
  };
}, RoomDetails);
const mapStateToProps = state => ({
  availability: state.booking.toggleAvailability,
  bookingId: state.booking.bookingId,

});

export default connect(mapStateToProps)(RoomDetailsContainer);
