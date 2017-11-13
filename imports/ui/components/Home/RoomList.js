import React, { Component } from 'react';
import { connect } from 'react-redux';
import { staticMarkerImage } from '../../../common/utils/googleMaps';
import RoomCard from './RoomCard';

class RoomList extends Component {

  renderCards() {
    return (
      this.props.rooms.map((room) => {
        const staticImageUrl =
          room.location ? staticMarkerImage(room.location[0], room.location[1], 300, 225)
            : 'http://placehold.it/350x225';

        return (
          <RoomCard
            key={room._id}
            roomId={room._id}
            staticImageUrl={staticImageUrl}
            name={room.name}
            pricePerDay={room.pricePerDay}
            capacity={room.capacity}
          />
        );
      })
    );
  }

  render() {
    const cards = this.renderCards();
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

export default connect(mapStateToProps)(RoomList);
