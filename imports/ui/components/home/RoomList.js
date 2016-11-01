import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {Card, CardActions, CardHeader, CardMedia, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import {staticMarkerImage} from "../../../common/utils/googleMaps";
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { Rooms } from '../../../api/rooms/rooms';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

 class RoomList extends Component {
    _renderCards() {
        return(
            this.props.rooms.map((room) => {
                var staticImageUrl = staticMarkerImage(room.location[0], room.location[1], 400, 200);

                return (
                    <div key={room._id} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                        <Card className="home-card">
                            <CardHeader
                                title={room.name}
                                actAsExpander={true}
                                showExpandableButton={true}
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
                                <RaisedButton onClick={() => this._navigate(room._id)} primary label="Open this room" />
                            </CardActions>
                            <CardText expandable={true}>
                                {room.description}
                            </CardText>
                        </Card>
                    </div>
                );
            })
        );
    }

    _navigate(roomId){
        browserHistory.push(`/v2/rooms/${roomId}`);
    }

    render() {
        if(this.props.loading){
            return (
                <div className="row middle-xs middle-sm middle-md middle-lg center-md center-sm center-xs center-lg">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <CircularProgress size={80} thickness={5} />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="row">
                    <h5>{this.props.rooms.length } result(s) found:</h5>
                </div>
                <div className="row">
                    {this._renderCards()}
                </div>
            </div>);

    }
}


const RoomListContainer = createContainer(() => {
    const roomsHandle = Meteor.subscribe('rooms.bookingsAvailable.byDate', new Date());
    //TODO: fix loading with publishComposite
    const loading = !roomsHandle.ready();

    console.log('SUBSCRIBE rooms.bookingsAvailable.byDate', loading);
    return {
        currentUser: Meteor.user(),
        rooms: Rooms.find({}).fetch(),
        loading: false,
    };
}, RoomList);


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(RoomListContainer);