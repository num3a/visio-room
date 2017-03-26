import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {staticMarkerImage} from "../../../common/utils/googleMaps";
import { connect } from 'react-redux';
import { Router, Route, Link, NavLink } from 'react-router-dom';
import RoomCard from "./RoomCard";

class RoomList extends Component {
    _disableOpenRoom(){
        if(this.props.isAuthenticated){
            return false;
        }
        return true;
    }

    renderCardFooter(roomId){
        if(this.props.isAuthenticated){
            return <NavLink disabled className="card-footer-item" to={`/rooms/${roomId}`} >Open</NavLink>;
        }
        else {
            return <span></span>
        }
    }

    _renderCards() {
        return(
            this.props.rooms.map((room) => {
                var staticImageUrl = staticMarkerImage(room.location[0], room.location[1], 300, 225);
                return (
                    <RoomCard
                        key={room._id}
                        room={room}
                        isAuthenticated={this.props.isAuthenticated}
                        staticImageUrl={staticImageUrl}

                    />
                );
            })
        );
    }

    _loginMessage(){
        if(!this.props.isAuthenticated){
            return(<div className="content">
                        <h5 className="is-subtitle is-5">Please login to book a room.</h5>
                </div>
            );
        }
    }
    render() {

        return (
            <div>
                {this._loginMessage()}
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