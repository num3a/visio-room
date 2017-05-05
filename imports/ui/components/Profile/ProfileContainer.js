import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { translate } from 'react-i18next';
import ProfileInformations from './ProfileInformations';
import History from './History';
import { Bookings } from '../../../api/bookings/bookings';
import { Rooms } from '../../../api/rooms/rooms';

class Profile extends Component {
  getRoomById(roomId) {
    if (this.props.loadingRooms) {
      return {
        name: '',
      };
    }
    const room = _.find(this.props.rooms, room => room._id == roomId);

    return room;
  }
  getAvatarUrl() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return '';
    }

    const profile = currentUser.profile;
    const placeHolditUrl = `http://placehold.it/75?text=${profile.firstName[0].toUpperCase()}${profile.lastName[0].toUpperCase()}`;

    const avatar = profile.pictureUrl ? profile.pictureUrl : placeHolditUrl;
    return avatar;
  }

  getBookingsWithRooms() {
    const data = [];

    for (const booking of this.props.bookings) {
      const room = this.getRoomById(booking.roomId);
      data.push({
        ...booking,
        room: {
          ...room,
        },
      });
    }
    return data;
  }

  render() {
    if (!this.props.currentUser) {
      return <div />;
    }
    const avatar = this.getAvatarUrl();
    const { t } = this.props;
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <h1 className="title">{t('title')}</h1>
            <ProfileInformations
              firstName={this.props.currentUser.profile.firstName}
              lastName={this.props.currentUser.profile.lastName}
              avatar={avatar}
            />
          </div>
          <div className="column is-8">
            <h1 className="title">{t('history')}</h1>
            <History enhancedBooking={this.getBookingsWithRooms()} />
          </div>
        </div>

      </div>

    );
  }
}

const ProfileContainer = createContainer(() => {
  const userId = Meteor.userId();
  const bookingHandle = Meteor.subscribe('bookings.byUserId');
  const bookings = Bookings.find({ bookedBy: userId }, { limit: 30, sort: { bookingDate: -1 } }).fetch() || [];

  let roomIds = bookings.map(booking => booking.roomId);
  roomIds = roomIds == null ? [] : roomIds;

  const roomHandle = Meteor.subscribe('rooms.byIds', roomIds);

  const rooms = Rooms.find({ _id: { $in: roomIds } }).fetch();

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    bookings: bookings || [],
    loadingBookings: !bookingHandle.ready(),
    loadingRooms: !roomHandle.ready(),
    rooms: rooms || [],
  };
}, Profile);

const mapStateToProps = state => ({
});

export default translate(['profile'], { wait: true })(connect(mapStateToProps)(ProfileContainer));
