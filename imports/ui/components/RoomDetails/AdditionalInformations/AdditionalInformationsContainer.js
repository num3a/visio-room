import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../../../api/rooms/rooms-collection';

import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import AdditionalInformations from './AdditionalInformations';
import { staticMarkerImage } from '../../../../common/utils/googleMaps';

class Informations extends Component {


  constructor() {
    super();
    this.state = {
      activeTab: 'overview',
    };
  }
  render() {
    const { room } = this.props;

    const staticImageUrl =
      room.location ? staticMarkerImage(room.location[0], room.location[1], 300, 300)
        : 'http://placehold.it/350x225';

    if (!this.props.room) {
      return <div />;
    }
    return (<AdditionalInformations
      overview={this.props.room.description}
      equipments=""
      access=""
      reviews="no_reviews"
      activeTab={this.state.activeTab}
      onOverviewClick={() => this.setState({ activeTab: 'overview' })}
      onEquipmentsClick={() => this.setState({ activeTab: 'equipments' })}
      onAccessClick={() => this.setState({ activeTab: 'access' })}
      onReviewsClick={() => this.setState({ activeTab: 'reviews' })}
      staticImageUrl={staticImageUrl}
    />);
  }
}


const AdditionalInformationsContainer = withTracker(({ roomId }) => {
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
