import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { staticMarkerImage } from '../../../common/utils/googleMaps';
import Details from './RoomDetails';
import RoomBooking from './RoomBooking';
import RoomAdditionalInfos from './RoomAdditionalInfos';
import { toggleAvailability, resetAvailability, selectedBookingChanged, selectedCardChanged } from '../../actions/booking';
import { Bookings } from '../../../api/bookings/bookings';

class RoomDetails extends Component {

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetAvailability());
    dispatch(selectedBookingChanged(null));
    dispatch(selectedCardChanged(null));
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

  render() {
    // TODO: display striked price when voucher is active

    const staticImageUrl = this.getBigPicture();
    return (
      <div>
        { !this.props.availability && !this.props.bookingId ?
          <Details
            roomId={this.props.roomId}
            room={this.props.room}
            bigPicture={staticImageUrl}
            bookingId={this.props.booking}
            toggle={() => this.toggleAvailability()}
          />
          :
          <RoomBooking
            roomId={this.props.roomId}
          />
        }
        <RoomAdditionalInfos
          roomId={this.props.roomId}
          room={this.props.room}
        />
      </div>
    );
  }
}

const RoomDetailsContainer = createContainer(({ match }) => {
  // const roomHandle = Meteor.subscribe('rooms.byId', match.params.roomId);
  // const room = Rooms.findOne(match.params.roomId);

  const bookingHandle = Meteor.subscribe('bookings.byId', match.params.bookingId);
  const booking = Bookings.findOne(match.params.bookingId);
  const room = booking ? booking.room : {};
  const roomId = room ? room._id : null;
  const loading = !bookingHandle.ready();

  return {
    booking,
    roomId,
    room,
    loading,
  };
}, RoomDetails);
const mapStateToProps = state => ({
  availability: state.booking.toggleAvailability,
  bookingId: state.booking.bookingId,

});

export default connect(mapStateToProps)(RoomDetailsContainer);
