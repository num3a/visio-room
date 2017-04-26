import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../../../api/rooms/rooms';

import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import AdditionalInformations from './AdditionalInformations';

class Informations extends Component {

  render() {
    if (!this.props.room) {
      return <div />;
    }
    return (<AdditionalInformations
      description={this.props.room.description}
    />);
  }
}


const AdditionalInformationsContainer = createContainer(({ roomId }) => {
  const roomHandle = Meteor.subscribe('rooms.byId', roomId);
  const room = Rooms.findOne(roomId);

  const loading = !roomHandle.ready();

  return {
    roomId,
    loading,
    room,
  };
}, Informations);

const mapStateToProps = state => ({
  bookingId: state.booking.bookingId,
});

export default connect(mapStateToProps)(AdditionalInformationsContainer);
