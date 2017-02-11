import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import BookingPayment from './BookingPayment';
import BookingSelection from './BookingSelection';

class RoomBooking extends Component {
    render(){

        if(!this.props.bookingId){
            return <div className="row">
                <div>
                   <BookingSelection
                   roomId={this.props.roomId}/>
                </div>
            </div>;
        }
        else {
            return <div>
                <BookingPayment
                    roomId={this.props.roomId}
                />
            </div>
        }
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