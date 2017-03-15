import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import moment from "moment";
import { grey500, green500, red500} from "material-ui/styles/colors";
import {Card, CardHeader, CardActions } from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
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

    renderCards(bookings){
        return bookings.map((booking) => {
            let isActive = !booking.isBooked && !booking.isBlocked;
            let color = isActive ? green500 : red500;
            let label = isActive ? 'Book': 'Booked';
            if(booking.isBlocked){
                label = 'Unavailable';
                color = grey500;
            }

            return <div key={booking._id} className="column is-3">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            {booking.bookingDate.toDateString()}
                        </p>
                        <a className="card-header-icon">
                    <span className="icon">
                    <i className="fa fa-angle-down"/>
                    </span>
                        </a>
                    </header>

                    <footer className="card-footer">
                        { booking.isBlocked ?
                            <a
                                disabled={!isActive}
                                className="button is-light"
                            >{label}</a> :
                            <a
                                disabled={!isActive}
                                className={classnames('button', isActive ? 'is-success' : 'is-danger')} >{label}</a>
                        }
                    </footer>
                    <CardActions>
                        <FlatButton
                            label={label}
                            disabled={!isActive}
                            backgroundColor={color}
                            style={{ color: 'white'}}
                            onClick={() => this.handleBookingSelection(booking)}
                        />
                    </CardActions>
                </div>
            </div>;
        });
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