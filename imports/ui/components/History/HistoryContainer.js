import React, {Component} from "react";
import moment from "moment";
import { Bookings } from '../../../api/bookings/bookings';
import { Rooms } from '../../../api/rooms/rooms';
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import { surroundingDates, addDays } from "../../../common/utils/dateUtils";
import {Card, CardHeader, CardActions, CardTitle, CardText, CardMedia } from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';

class History extends Component {
    _cancelBooking(bookingId){

    }

    _resendBooking(bookingId){

    }

    _sendBookingConfirmation(booking){

    }

    _getRoomById(roomId){

        if(this.props.loadingRooms){
            return {
                name: ''
            };
        }
        let room = _.find(this.props.rooms, (room) => {
            return room._id == roomId;
        });

        return room;
    }

    _renderCard(booking){

        const { isAuthenticated } = this.props;
        let bookingDate = moment(booking.bookingDate).format('DD/MM/YYYY');
        let room = this._getRoomById(booking.roomId);

        let lastCancelDate = moment().add('days', 1);
        const cancelIsActive = booking.bookingDate > lastCancelDate;
        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" style={{marginTop: 10}}>
                <Card>
                    <CardHeader
                        title={room.name}
                        subtitle={bookingDate}
                        actAsExpander={false}
                        showExpandableButton={false}
                    />
                    <CardText>
                        {room.address}
                    </CardText>
                    <CardActions>
                        <FlatButton disabled={!cancelIsActive} label="Cancel booking" onClick={() => this._cancelBooking()} secondary />
                    </CardActions>
                </Card>
            </div>
        );
    }

    _renderBookingList(){
        if(!this.props.loadingBookings){
            return (
                <div className="row">
                    {this.props.bookings.map((booking) => {
                        return this._renderCard(booking);
                    })}
                </div>
            );
        }
        else {
            return <CircularProgress />;
        }
    }

    render(){
        return (<div>
            {this._renderBookingList()}
        </div>);
    }
}

const HistoryContainer = createContainer(() => {
    let userId = Meteor.userId();
    let bookingHandle = Meteor.subscribe('bookings.byUserId', userId);
    let bookings = Bookings.find({ bookedBy: userId}, { limit: 30, sort: { bookingDate: -1}}).fetch() || [];

    let roomIds = bookings.map((booking) => {
        return booking.roomId;
    });
    roomIds = roomIds == null ? [] : roomIds;

    let roomHandle = Meteor.subscribe('rooms.byIds', roomIds);

    let rooms = Rooms.find( {_id : { $in: roomIds }}).fetch();

    return {
        isAuthenticated: Meteor.userId(),
        bookings: bookings,
        loadingBookings : !bookingHandle.ready(),
        loadingRooms: !roomHandle.ready(),
        rooms:rooms,
    };
}, History);

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(HistoryContainer);
