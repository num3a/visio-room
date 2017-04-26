import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Bookings } from '../../../../../api/bookings/bookings';

import { addDays } from '../../../../../common/utils/dateUtils';
import moment from 'moment';
import Toggle from 'material-ui/Toggle';
import { Card, CardText } from 'material-ui/Card';
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

      /*
       *  <List>
       <Subheader>Priority Interruptions</Subheader>
       <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
       <ListItem primaryText="Calls" rightToggle={<Toggle />} />
       <ListItem primaryText="Messages" rightToggle={<Toggle />} />
       </List>
       */
    return (<div className="row">

      {this.props.bookings.map((booking) => {
        const formattedDate = moment(booking.bookingDate).format('dddd DD-MM-YYYY');
        const cardLabel = booking.isBlocked ? 'Room blocked' : 'Room available';

        return (<div key={booking._id} className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <Card>
            <CardText>{formattedDate}</CardText>
            <CardText>
              <Toggle
                toggled={!booking.isBlocked}
                onToggle={() => this.handleBlock(booking._id, !booking.isBlocked)}
                labelPosition="right"
                label={cardLabel}
              />
            </CardText>
          </Card>
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

  const bookingHandle = Meteor.subscribe('bookings.byRoom', selectedRoomId, now, maxDate);

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
