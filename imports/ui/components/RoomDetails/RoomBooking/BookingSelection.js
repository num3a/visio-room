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

class BookingSelection extends Component {
    handleBookingSelection(booking){
        const { dispatch } = this.props;
        dispatch(selectedBookingChanged(booking._id));
    }

    render(){
        let { bookings } = this.props;
        if(!bookings){
            return <h1>No data</h1>;
        }

        return(
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="box">
                            <h5>Select a booking date</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        bookings.map((booking) => {
                            let isActive = !booking.isBooked && !booking.isBlocked;
                            let color = isActive ? green500 : red500;
                            let label = isActive ? 'Book': 'Booked';

                            return <div key={booking._id} className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                                <Card style={{margin:10, backgroundColor: grey500}}>
                                    <CardHeader
                                        titleColor="white"
                                        title={booking.bookingDate.toDateString()}
                                    />
                                    <CardActions>
                                        <FlatButton
                                            label={label}
                                            disabled={!isActive}
                                            backgroundColor={color}
                                            style={{ color: 'white'}}
                                            onClick={() => this.handleBookingSelection(booking)}
                                        />
                                    </CardActions>
                                </Card>
                            </div>;
                        })
                    }
                </div>
            </div>
        );
    }
}


const BookingSelectionContainer = createContainer(({roomId}) => {
    let now  = moment().toDate();
    let maxDate = addDays(now, 10);

    let bookingHandle = Meteor.subscribe('bookings.byRoom', roomId, now, maxDate);

    return {
        isAuthenticated: Meteor.userId(),
        bookings: Bookings.find({ roomId: roomId }).fetch(),
        loadingBookings : !bookingHandle.ready(),
        roomId: roomId,
    };
}, BookingSelection);


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(BookingSelectionContainer);