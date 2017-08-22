import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import moment from 'moment';

import { Bookings } from '../../../../../api/bookings/bookings-collection';
import { addDays } from '../../../../../common/utils/dateUtils';
import { snackBarOpen, snackBarClose, snackBarMessageChanged } from '../../../../actions/snackbar';

class BookingManager extends Component {
  handleBlock(bookingId, isBlocked) {
    const toggle = {
      bookingId,
      isBlocked,
    };
    const { dispatch } = this.props;

    Meteor.call('admin.toggleBooking', toggle, (err, result) => {
      console.log('admin.err', err);
      console.log('admin.result', result);
      if (err) {
        dispatch(snackBarMessageChanged(err.error));
        dispatch(snackBarOpen());

        Meteor.setTimeout(() => {
          dispatch(snackBarClose());
        }, 4000);
      }
    });
  }
  renderBookings() {
    if (this.props.bookings.length === 0) {
      return <h5>No bookings</h5>;
    }

    return (<div className="row">

      {this.props.bookings.map((booking) => {
        const formattedDate = moment(booking.bookingDate).format('dddd DD-MM-YYYY');
        const cardLabel = booking.isBlocked ? 'Room blocked' : 'Room available';

        return (<div key={booking._id} className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div className="card">
            <div className="header">
              <span className="card-header-title">{formattedDate}</span>
            </div>
            <div className="card-content">
              <a
                className={classnames('button', {'is-danger': booking.isBlocked })}
                onClick={() => this.handleBlock(booking._id, !booking.isBlocked)}
              >
                {cardLabel}
              </a>
            </div>
          </div>
        </div>);
      })}
    </div>);
  }

  render() {
    return (<div>
      <h4>Booking Manager</h4>
      {this.renderBookings()}
    </div>);
  }
}

const BookingManagerContainer = createContainer(({ selectedRoomId }) => {
  const admin = Roles.userIsInRole(Meteor.userId(), 'admin');
  const roomsHandle = null;

  const now = moment().toDate();
  const maxDate = addDays(now, 31);

  const search = {
    roomId: selectedRoomId,
    minDate: now,
    maxDate,
  };

  const bookingHandle = Meteor.subscribe('bookings.byRoom', search);

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    loading: !bookingHandle.ready(),
    bookings: Bookings.find({}).fetch() || [],
  };
}, BookingManager);

const mapStateToProps = state => ({
  selectedRoomId: state.admin.roomId,
});

export default connect(mapStateToProps)(BookingManagerContainer);
