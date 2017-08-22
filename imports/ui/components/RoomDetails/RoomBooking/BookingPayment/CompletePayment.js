import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import classnames from 'classnames';

import { selectedBookingChanged, cguAccepted } from '../../../../actions/room';
import { resetAvailability, updateBookingList, loadingCompleteBooking } from '../../../../actions/booking';
import { notificationOpenError, notificationOpenSuccess } from '../../../../actions/notification';


class CompletePayment extends Component {

  handlePrev() {
    const { dispatch } = this.props;
    dispatch(selectedBookingChanged(null));
  }

  onCancel() {
    const { dispatch } = this.props;
    dispatch(cguAccepted(false));
    dispatch(updateBookingList([]));
    dispatch(resetAvailability());
  }

  onCGUChange(event) {
    const { dispatch } = this.props;
    const cgu = event.target.value === 'on';

    dispatch(cguAccepted(cgu));
  }
  completeBooking() {
    const code = this.props.voucher !== null && this.props.voucher.code !== null ? this.props.voucher.code : '';

    const bookingData = {
      customerId: this.props.selectedCard.customerId,
      voucher: code,
      bookingList: this.props.bookingList,
      userId: Meteor.userId(),
    };

    const { dispatch, t } = this.props;
    dispatch(loadingCompleteBooking(true));
    Meteor.apply('bookings.bookWithPayment', [bookingData], { noRetry: true }, (err, charge) => {
      console.log('bookings.err', err);
      console.log('bookings.data', charge);

      if (err) {
        dispatch(loadingCompleteBooking(false));
        dispatch(notificationOpenError(err.message));
      } else {
        notificationOpenSuccess(t('booking_payment_complete'));
        dispatch(loadingCompleteBooking(false));
        this.props.history.push('/profile');
      }
    });
  }

  render() {
    const { t } = this.props;

    return (
      <div >
        <p>

          <input
            onChange={(event, value) => this.onCGUChange(event)}
            name="cgu"
            type="checkbox"
          />
          <span style={{ marginLeft: 5 }}>{t('booking_payment_cgu_message')} <a target="_blank" href="/cgu">CGU</a></span>
        </p>

        <div style={{ marginTop: 12 }}>
          <button
            style={{ marginRight: 12 }}
            className={classnames('button', 'is-success', { 'is-loading': this.props.loadingCompleteBooking })}
            disabled={this.props.cguAccepted === false || !this.props.selectedCard}
            onClick={() => this.completeBooking()}
          >{t('booking_payment_button_complete')}</button>
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  cguAccepted: state.booking.cguAccepted,
  selectedCard: state.booking.selectedCard,
  voucher: state.booking.voucher,
  bookingId: state.booking.bookingId,
  bookingList: state.booking.bookingList,
  loadingCompleteBooking: state.booking.loadingCompleteBooking,
});

export default translate(['booking'], { wait: true })(withRouter(connect(mapStateToProps)(CompletePayment)));
