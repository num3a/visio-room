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
    _disableOpenRoom(){
        if(this.props.isAuthenticated){
            return false;
        }
        return true;
    }
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
                                <RaisedButton disabled={this._disableOpenRoom()} onClick={() => this._navigate(room._id)} primary label="Open this room" />
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
        browserHistory.push(`/rooms/${roomId}`);
    }
    _loginMessage(){
        if(!this.props.isAuthenticated){
            return(<div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h5>Please login to book a room.</h5>
                    </div>
                </div>
            );
        }
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
                {this._loginMessage()}
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h5>{this.props.rooms.length } room(s) found:</h5>
                    </div>
                </div>
                <div className="row">
                    {this._renderCards()}
                </div>
            </div>);

    }
}


const RoomListContainer = createContainer(() => {
    const roomsHandle = Meteor.subscribe('rooms.all');
    const loading = !roomsHandle.ready();
    let rooms = Rooms.find({}).fetch();

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
        rooms: rooms,
        loading: false,
    };
}, RoomList);


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(RoomListContainer);