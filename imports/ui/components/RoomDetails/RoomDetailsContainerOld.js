import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Rooms } from '../../../api/rooms/rooms';
import CircularProgress from 'material-ui/CircularProgress';
import { staticMarkerImage } from '../../../common/utils/googleMaps';

import RoomBooking from './RoomBooking';
import RoomDetailsInfo from './RoomInfo/RoomDetailsInfo';

class RoomDetails extends Component {

  _renderRoomDetails() {
    if (this.props.room) {
      const room = this.props.room;
      const staticImageUrl = staticMarkerImage(room.location[0], room.location[1], 800, 400);

      return (

        <RoomDetailsInfo
          name={room.name}
          staticImageUrl={staticImageUrl}
          capacity={room.capacity}
          pricePerDay={room.pricePerDay}
          description={room.description}
        />

      );
    }

    return (<CircularProgress size={80} thickness={5} />);
  }

  renderBooking() {
    return (
      <div>
        <RoomBooking
          roomId={this.props.roomId}
        />
      </div>
    );
  }

  render() {
    return (<div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="box">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
              <div className="box">

                {this._renderRoomDetails()}
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8">
              <div className="box">
                {this.renderBooking()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

const RoomDetailsContainer = createContainer(({ match }) => {
  const roomHandle = Meteor.subscribe('rooms.byId', match.params.roomId);
  const room = Rooms.findOne(match.params.roomId);

  return {
    roomId: match.params.roomId,
    room,
    loadingRooms: !roomHandle.ready(),
  };
}, RoomDetails);

export default RoomDetailsContainer;
