import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {staticMarkerImage} from "../../../common/utils/googleMaps";
import { connect } from 'react-redux';
import { Router, Route, Link, NavLink } from 'react-router-dom';

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
        const marginLeft = {marginLeft: '5px'};
        return(
            this.props.rooms.map((room) => {
                var staticImageUrl = staticMarkerImage(room.location[0], room.location[1], 300, 225);
                return (
                    <div key={room._id} className="column is-3">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">{room.name}</p>
                            </header>
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={staticImageUrl} alt="" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <strong className="timestamp">Price: {room.pricePerDay}€</strong>
                                    <br />
                                    <span>Room capacity: {room.capacity}</span>
                                    <br />
                                    <div>
                                        <span className="icon is-small" style={marginLeft}><i className="fa fa-wheelchair"/></span>
                                        <span className="icon is-small" style={marginLeft}><i className="fa fa-wifi"/></span>
                                        <span className="icon is-small" style={marginLeft}><i className="fa fa-snowflake-o"/></span>
                                        <span className="icon is-small" style={marginLeft}><i className="fa fa-print"/></span>
                                    </div>
                                </div>
                            </div>
                            <footer className="card-footer">
                                {this.renderCardFooter(room._id)}
                            </footer>
                        </div>
                    </div>
                );
            })
        );
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