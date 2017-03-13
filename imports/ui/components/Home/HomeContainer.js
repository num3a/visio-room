import React, {Component} from "react";
import RoomList from './RoomList';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import { Rooms } from '../../../api/rooms/rooms';
import {createContainer} from "meteor/react-meteor-data";

class Home extends Component {

    render() {
        return(
            <div className="container">
                <SearchBar count={this.props.rooms.length}/>
                <RoomList
                    isAuthenticated={this.props.isAuthenticated}
                    currentUser={this.props.currentUser}
                    loading={this.props.loading}
                    rooms={this.props.rooms} />
            </div>
        );
    }
}

const HomeContainer = createContainer(() => {
    const roomsHandle = Meteor.subscribe('rooms.all');
    const loading = !roomsHandle.ready();
    let rooms = Rooms.find({}).fetch();

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
        rooms: rooms || [],
        loading: loading,
    };
}, Home);


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(HomeContainer);