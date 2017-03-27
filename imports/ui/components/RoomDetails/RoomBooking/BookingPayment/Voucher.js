import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { closeBookingModal, openBookingModal, selectedBookingChanged, selectedVoucherChanged, voucherIsValid } from '../../../../actions/booking';
import {connect} from "react-redux";

class Voucher extends Component {
    onVoucherChange(event){
        const { dispatch } = this.props;
        const voucher = event.target.value;

        //TODO: encapsulate validation in async redux action
        Meteor.call('voucher.validate', voucher, (error, result) => {
            if(error){
                console.log('cannot validate voucher', error);
                dispatch(voucherIsValid(false));
                dispatch(selectedVoucherChanged(null));

                return;
            }
            if (result.isValid === true) {
                console.log('validation result', result);
                dispatch(voucherIsValid(true));
                dispatch(selectedVoucherChanged(result));
            }
            else {
                dispatch(voucherIsValid(false));
                dispatch(selectedVoucherChanged(null));
            }

        });
    }

    renderDiscountMessage(){
        if(this.props.voucher){
            const { code, percentage } = this.props.voucher;
            return <p className="subtitle is-4">Discount: {percentage}%</p>
        }
    }

    render(){
        return <div >
            <div>
                <input
                    onChange={(event, value) => this.onVoucherChange(event)}
                    name="voucher"
                    className="input"
                    type="text"
                    placeholder="Enter your voucher" />

            </div>
            <div>
                {this.renderDiscountMessage()}
            </div>
        </div>;
    }
}


const mapStateToProps = (state) => {
    return {
        voucher: state.booking.voucher
    };
};

export default connect(mapStateToProps)(Voucher);
