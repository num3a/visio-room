import React, { Component } from 'react';
import {createContainer} from "meteor/react-meteor-data";
import {connect} from "react-redux";
import { Bookings } from '../../../../api/bookings/bookings';
import moment from 'moment';

class SelectedBookingDetails extends Component {
    render(){
        if(this.props.booking){
            const { booking } = this.props;
            const date = moment(booking.bookingDate).format('DD/MM/YYYY');

            return(
                <div className="subtitle is-4">Booking date: {date}</div>
            );
        }
        else {
            return(<div>
            </div>);
        }
    }
}

const SelectedBookingDetailsContainer = createContainer(({bookingId}) => {
    let bookingHandle = Meteor.subscribe('bookings.byId', bookingId);
    return {
        isAuthenticated: Meteor.userId(),
        booking: Bookings.findOne({ _id: bookingId}),
        loadingBookings : !bookingHandle.ready()

    };
}, SelectedBookingDetails);

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(SelectedBookingDetailsContainer);
