import { connect } from 'react-redux';
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { closeBookingModal, openBookingModal, selectedBookingChanged, selectedVoucherChanged, voucherIsValid } from '../../../../actions/booking';

class Voucher extends Component {
  onVoucherChange(event) {
    const { dispatch } = this.props;
    const voucher = event.target.value;

    // TODO: encapsulate validation in async redux action
    Meteor.call('voucher.validate', voucher, (error, result) => {
      if (error) {
        console.log('cannot validate voucher', error);
        dispatch(voucherIsValid(false));
        dispatch(selectedVoucherChanged(null));

        return;
      }
      if (result.isValid === true) {
        console.log('validation result', result);
        dispatch(voucherIsValid(true));
        dispatch(selectedVoucherChanged(result));
      } else {
        dispatch(voucherIsValid(false));
        dispatch(selectedVoucherChanged(null));
      }
    });
  }

  renderDiscountMessage() {
    if (this.props.voucher) {
      const { code, percentage } = this.props.voucher;
      return <p className="subtitle is-4">Discount: {percentage}%</p>;
    }
  }

  render() {
    const { t } = this.props;

    return (<div >
      <div>
        <input
          onChange={(event, value) => this.onVoucherChange(event)}
          name="voucher"
          className="input"
          type="text"
          placeholder={t('booking_payment_voucher')}
        />

      </div>
      <div>
        {this.renderDiscountMessage()}
      </div>
    </div>);
  }
}


const mapStateToProps = state => ({
  voucher: state.booking.voucher,
});

export default translate(['booking'], { wait: true })(connect(mapStateToProps)(Voucher));
