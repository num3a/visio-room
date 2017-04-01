import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import BookingPayment from './BookingPayment';
import BookingSelection from './BookingSelection';
import {selectedBookingChanged, selectedVoucherChanged } from '../../../actions/booking';

class RoomBooking extends Component {
    render(){
        if(!this.props.bookingId){
            return <BookingSelection
                roomId={this.props.roomId}/>;
        }
        else {
            return <BookingPayment
                roomId={this.props.roomId}
            />

        }
    }

    componentWillUnmount(){
        const { dispatch } = this.props;
        dispatch(selectedVoucherChanged(''));
        dispatch(selectedBookingChanged(''));
    }
}

const RoomBookingContainer = createContainer(({roomId}) => {
    return {
        roomId: roomId,
    };
}, RoomBooking);

const mapStateToProps = (state) => {
    return {
        bookingId: state.booking.bookingId,
    };
};

export default connect(mapStateToProps)(RoomBookingContainer);