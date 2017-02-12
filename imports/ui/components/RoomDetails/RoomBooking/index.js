import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import BookingPayment from './BookingPayment';
import BookingSelection from './BookingSelection';

class RoomBooking extends Component {
    render(){

        if(!this.props.bookingId){
            return <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="box">
                        <BookingSelection
                            roomId={this.props.roomId}/>
                    </div>
                </div>
            </div>;
        }
        else {
            return <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="box">
                        <BookingPayment
                            roomId={this.props.roomId}
                        />
                    </div>
                </div>
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