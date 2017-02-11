import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { closeBookingModal, openBookingModal, selectedBookingChanged, selectedVoucherChanged, voucherIsValid } from '../../../../actions/booking';
import {connect} from "react-redux";

class Voucher extends Component {
    onVoucherChange(voucher){
        const { dispatch } = this.props;

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
            return <h5>Discount: {percentage}%</h5>
        }
    }

    render(){
        return <div className="row">
            <div className="col-sm-12">

                <TextField
                    hintText="Enter your voucher"
                    onChange={(event, value) => this.onVoucherChange(value)}
                />
            </div>
            <div className="col-lg-12">
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
