import React, { Component } from 'react';
import moment from 'moment';
import { Bookings } from '../../../api/bookings/bookings-collection';
import { Rooms } from '../../../api/rooms/rooms-collection';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { surroundingDates, addDays } from '../../../common/utils/dateUtils';
import { Card, CardHeader, CardActions, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';

class History extends Component {

  _getRoomById(roomId) {
    if (this.props.loadingRooms) {
      return {
        name: '',
      };
    }
    const room = _.find(this.props.rooms, room => room._id == roomId);

    return room;
  }

  _renderCard(booking) {
    const { isAuthenticated } = this.props;
    const bookingDate = moment(booking.bookingDate).format('DD/MM/YYYY');
    const room = this._getRoomById(booking.roomId);

    const lastCancelDate = moment().add('days', 1);
    let cancelIsActive = booking.bookingDate > lastCancelDate;
    cancelIsActive = false;

    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" style={{ marginTop: 10 }}>
        <Card>
          <CardHeader
            title={room.name}
            subtitle={bookingDate}
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardText>
            {room.address}
          </CardText>
          <CardActions>
            <FlatButton disabled={!cancelIsActive} label="Cancel booking" onClick={() => this._cancelBooking()} secondary />
          </CardActions>
        </Card>
      </div>
    );
  }

  _renderBookingList() {
    if (!this.props.loadingBookings) {
      return (
        <div className="row">
          {this.props.bookings.map(booking => this._renderCard(booking))}
        </div>
      );
    }

    return <CircularProgress />;
  }

  render() {
    return (<div>
      {this._renderBookingList()}
    </div>);
  }
}

const HistoryContainer = createContainer(() => {
  const userId = Meteor.userId();
  const bookingHandle = Meteor.subscribe('bookings.byUserId');
  const bookings = Bookings.find({ bookedBy: userId }, { limit: 30, sort: { bookingDate: -1 } }).fetch() || [];

  let roomIds = bookings.map(booking => booking.roomId);
  roomIds = roomIds == null ? [] : roomIds;

  const roomHandle = Meteor.subscribe('rooms.byIds', roomIds);

  const rooms = Rooms.find({ _id: { $in: roomIds } }).fetch();

  return {
    isAuthenticated: Meteor.userId(),
    bookings,
    loadingBookings: !bookingHandle.ready(),
    loadingRooms: !roomHandle.ready(),
    rooms,
  };
}, History);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(HistoryContainer);
