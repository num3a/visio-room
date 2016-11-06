import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { surroundingDates } from '../../../common/utils/dateUtils';
import { Rooms } from '../../../api/rooms/rooms';
import { Bookings} from '../../../api/bookings/bookings';
import CircularProgress from 'material-ui/CircularProgress';

class RoomDetails extends Component {
    _renderRoomDetails() {
        if(this.props.loading){
            return (<CircularProgress size={80} thickness={5} />);
        }
            return (<div></div>);     gi
    }
    render() {
        return (<div>
            <h3>Rooms details</h3>
            {this._renderRoomDetails()}
        </div>);
    }
}

const RoomDetailsContainer = createContainer(({ params }) => {
    //TODO: handle different dates
    let now = new Date();
    let surround = surroundingDates(now);
    const bookingHandle = Meteor.subscribe('bookings.byRoom', params.roomId, surround.minDate, surround.maxDate);
    const roomHandle = Meteor.subscribe('rooms.byId', params.roomId);
    return {
        rooms: Rooms.find({_id: params.roomId}).fetch(),
        bookings: Bookings.find({ roomId: params.roomId }).fetch(),
        loading: bookingHandle.ready() && roomHandle.ready(),
    }
}, RoomDetails);

export default RoomDetailsContainer;