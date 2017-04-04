import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {staticMarkerImage} from "../../../common/utils/googleMaps";
import { connect } from 'react-redux';
import { Router, Route, Link, NavLink } from 'react-router-dom';
import RoomCard from "./RoomCard";

class RoomList extends Component {

    _renderCards() {
        return(
            this.props.rooms.map((room) => {
                let staticImageUrl =
                    room.location ? staticMarkerImage(room.location[0], room.location[1], 300, 225)
                    : 'http://placehold.it/350x225';

                return (
                    <RoomCard
                        key={room._id}
                        room={room}
                        staticImageUrl={staticImageUrl}

                    />
                );
            })
        );
    }

    render() {

        return (
            <div>
                <div className="columns is-multiline">
                    {this._renderCards()}
                </div>
            </div>);

    }
}




const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(RoomList);