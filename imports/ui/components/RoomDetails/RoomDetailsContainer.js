import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {Rooms} from "../../../api/rooms/rooms";
import CircularProgress from "material-ui/CircularProgress";
import {staticMarkerImage} from "../../../common/utils/googleMaps";

import RoomBooking from './RoomBooking';
import RoomDetailsInfo from './RoomInfo/RoomDetailsInfo';

class RoomDetails extends Component {
    /*
     shouldComponentUpdate(nextProps, nextState){
     if(JSON.stringify(this.props.rooms) === JSON.stringify(nextProps.rooms)){
     return false;
     console.log('prevent component update');
     debugger;
     }
     console.log('RoomDetails component update');
     return true;
     }*/

    _renderRoomDetails() {
        if(this.props.room) {
            let room = this.props.room;
            let staticImageUrl = staticMarkerImage(room.location[0], room.location[1], 800, 400);

            return (

                <RoomDetailsInfo
                    name={room.name}
                    staticImageUrl={staticImageUrl}
                    capacity={room.capacity}
                    pricePerDay={room.pricePerDay}
                    description={room.description}
                />

            );
        }
        else {
            return (<CircularProgress size={80} thickness={5} />);
        }
    }

    _renderBookingStepper() {
        return(
            <div>
                <RoomBooking
                    roomId={this.props.roomId}
                />
            </div>
        );
    }

    render() {
        return (<div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    {this._renderRoomDetails()}
                </div>

                <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                    {this._renderBookingStepper()}

                    <div className="row">

                    </div>
                </div>
            </div>
            <div className="row">
            </div>
        </div>);
    }
}

const RoomDetailsContainer = createContainer(({ params }) => {
    let roomHandle = Meteor.subscribe('rooms.byId', params.roomId);
    let room = Rooms.findOne(params.roomId);

    return {
        roomId: params.roomId,
        room: room,
        loadingRooms: !roomHandle.ready(),
    }
}, RoomDetails);

export default RoomDetailsContainer;