import React, { Component } from 'react';
import { connect } from 'react-redux';
import { staticMarkerImage } from '../../../common/utils/googleMaps';
import RoomCard from './RoomCard';

class BookingList extends Component {

  renderCards() {
    return (
      this.props.bookings.map((booking) => {
        const room = booking.room;
        const staticImageUrl =
          room.location ? staticMarkerImage(room.location[0], room.location[1], 300, 225)
            : 'http://placehold.it/350x225';

        return (
          <RoomCard
            key={booking._id}
            room={room}
            staticImageUrl={staticImageUrl}
          />
        );
      })
    );
  }

  render() {
    return (
      <div>
        <div className="columns is-multiline">
          {this.renderCards()}
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(BookingList);
