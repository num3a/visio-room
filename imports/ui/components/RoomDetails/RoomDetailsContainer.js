import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {surroundingDates} from "../../../common/utils/dateUtils";
import {Rooms} from "../../../api/rooms/rooms";
import {Bookings} from "../../../api/bookings/bookings";
import CircularProgress from "material-ui/CircularProgress";
import {Card, CardActions, CardHeader, CardMedia, CardText} from "material-ui/Card";
import {staticMarkerImage} from "../../../common/utils/googleMaps";
import RaisedButton from "material-ui/RaisedButton";
import { grey500, green500, red500 } from "material-ui/styles/colors";
import moment from 'moment';
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
        }

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

    _renderBookingControls(){
        //todo: remove mocks
        let tabs = [{},{},{},{},{},{},{},{},{},{}];
        let i = 0;
        let now = moment();
        return(
            tabs.map(() => {
                i++;
                let color = (i % 2 == 0) ? green500 : red500;
                if(i == 1){
                    color = grey500;
                }
                return <div key={i} className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                    <Card style={{margin:10, backgroundColor: color, color: 'white'}}>
                        <CardHeader
                            titleColor="white"
                            title={now.add(1, 'days').toDate().toDateString()}
                        />
                        <CardText>description</CardText>
                    </Card>
                </div>;
            })
        );
    }

    render() {
        return (<div>
            {this._renderTitle()}
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    {this._renderRoomDetails()}
                </div>
                <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                            <h4>Select a booking day:</h4>
                        </div>
                    </div>
                    <div className="row">
                        {this._renderBookingControls()}
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <RaisedButton fullWidth primary>Go</RaisedButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <RoomBookingStepper />
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
    //TODO: handle different dates
    let now = new Date();
    let surround = surroundingDates(now);
    const bookingHandle = Meteor.subscribe('bookings.byRoom', params.roomId, surround.minDate, surround.maxDate);
    const roomHandle = Meteor.subscribe('rooms.byId', params.roomId);
    return {
        rooms: Rooms.findOne(params.roomId),
        bookings: Bookings.find({ roomId: params.roomId }).fetch(),
        loadingRooms: !roomHandle.ready(),
        loadingBookings: !bookingHandle.ready(),
    }
}, RoomDetails);

export default RoomDetailsContainer;