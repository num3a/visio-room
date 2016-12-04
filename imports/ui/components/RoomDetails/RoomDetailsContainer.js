import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import { surroundingDates, addDays } from "../../../common/utils/dateUtils";
import {Rooms} from "../../../api/rooms/rooms";
import CircularProgress from "material-ui/CircularProgress";
import {Card, CardActions, CardHeader, CardMedia, CardText} from "material-ui/Card";
import {staticMarkerImage} from "../../../common/utils/googleMaps";
import RaisedButton from "material-ui/RaisedButton";
import { grey500, green500, red500 } from "material-ui/styles/colors";
import moment from 'moment';

import BookingControls from './BookingControls';

import RoomBookingStepper from './RoomBookingStepper';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';

class RoomDetails extends Component {
    shouldComponentUpdate(nextProps, nextState){
        if(JSON.stringify(this.props.rooms) === JSON.stringify(nextProps.rooms)){
            return false;
            console.log('prevent component update');
        }

        console.log('RoomDetails component update');
        return true;
    }
    _renderRoomDetails() {
        if(this.props.rooms) {
            let room = this.props.rooms;
            let   staticImageUrl = staticMarkerImage(room.location[0], room.location[1], 800, 400);

            return (
                <Card className="home-card">
                    <CardHeader
                    />
                    <CardMedia>
                        <img src={staticImageUrl}/>
                    </CardMedia>
                    <CardText>
                        <p>
                            Capacity: {room.capacity}
                        </p>
                        <p>
                            Price: {room.pricePerDay}
                        </p>
                    </CardText>
                    <CardText>
                        {room.description}
                    </CardText>
                </Card>
            );
        }
        else {
            return (<CircularProgress size={80} thickness={5} />);
        }
    }

    _renderBookingStepper() {

        return(
            <div>
                <RoomBookingStepper
                    roomId={this.props.roomId}
                />
            </div>
        );

    }

    render() {

        console.log('done loading');
        return (<div>
            {this._renderTitle()}
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    {this._renderRoomDetails()}
                </div>
                <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                    {this._renderBookingStepper()}
                </div>
            </div>
            <div className="row">
            </div>
        </div>);
    }

    _renderTitle() {
        if(this.props.rooms){
            return <h3>{this.props.rooms.name}</h3>;
        }
        else {
            return <div></div>;
        }
    }
}

const RoomDetailsContainer = createContainer(({ params }) => {
    let roomHandle = Meteor.subscribe('rooms.byId', params.roomId);
    let rooms = Rooms.findOne(params.roomId);

    return {
        roomId: params.roomId,
        rooms: rooms,
        loadingRooms: !roomHandle.ready(),
    }
}, RoomDetails);

export default RoomDetailsContainer;