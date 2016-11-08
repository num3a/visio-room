import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { surroundingDates } from '../../../common/utils/dateUtils';
import { Rooms } from '../../../api/rooms/rooms';
import { Bookings} from '../../../api/bookings/bookings';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardText} from "material-ui/Card";
import {staticMarkerImage} from "../../../common/utils/googleMaps";
import RaisedButton from 'material-ui/RaisedButton';


class RoomDetails extends Component {
    _renderRoomDetails() {
        let room = this.props.rooms[0];
        var staticImageUrl = staticMarkerImage(room.location[0], room.location[1], 800, 400);

        if(this.props.loading){
            return (<CircularProgress size={80} thickness={5} />);
        }
        return (
            <Card className="home-card">
                <CardHeader
                />
                <CardMedia>
                    <img src={staticImageUrl} />
                </CardMedia>
                <CardText>
                    <p>
                        Capacity: {room.capacity}
                    </p>
                    <p>
                        Price: {room.pricePerDay}
                    </p>
                </CardText>
                <CardActions>
                    <RaisedButton fullWidth primary label="Book" />
                </CardActions>
                <CardText>
                    {room.description}
                </CardText>
            </Card>
        );
    }
    render() {
        return (<div>
            <h3>{this.props.rooms[0].name}</h3>
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