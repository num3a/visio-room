import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import moment from "moment";
import { selectedBookingChanged } from '../../../actions/booking';
import { Bookings } from '../../../../api/bookings/bookings';
import { addDays } from "../../../../common/utils/dateUtils";
import classnames from 'classnames';
import BookingTable from './BookingTable';

class BookingSelection extends Component {
    handleBookingSelection(booking){
        const { dispatch } = this.props;
        dispatch(selectedBookingChanged(booking._id));
    }

    renderBookings (bookings){
        return <BookingTable
            bookings={bookings}
            onSelect={(booking) => this.handleBookingSelection(booking)}
        />
    }
    render(){
        let { bookings } = this.props;
        if(!bookings){
            return <h1>No data</h1>;
        }

        return(
            <div className="container">
                <div className="subtitle is-3">Select a booking date</div>
                <div className="box">
                    {this.renderBookings(bookings)}
                    {/*<div class="columns is-multiline">
                        {this.renderCards(bookings)}
                    </div> */}
                </div>
            </div>
        );
    }
}


const BookingSelectionContainer = createContainer(({roomId}) => {
    let now  = moment().toDate();
    let maxDate = addDays(now, 30);

    let bookingHandle = Meteor.subscribe('bookings.byRoom', roomId, now, maxDate);
    let bookings =  Bookings.find({ roomId: roomId }).fetch();
    return {
        isAuthenticated: Meteor.userId(),
        bookings:bookings || [],
        loadingBookings : !bookingHandle.ready(),
        roomId: roomId,
    };
}, BookingSelection);


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(BookingSelectionContainer);