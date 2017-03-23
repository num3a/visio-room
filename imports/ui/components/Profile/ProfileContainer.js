import React, { Component } from 'react';
import {connect} from "react-redux";
import { createContainer } from 'meteor/react-meteor-data';

import ProfileInformations from './ProfileInformations';
import History from './History';
import { Bookings } from '../../../api/bookings/bookings';
import { Rooms } from '../../../api/rooms/rooms';
import _ from 'lodash';

class Profile extends Component {
    getRoomById(roomId){

        if(this.props.loadingRooms){
            return {
                name: ''
            };
        }
        let room = _.find(this.props.rooms, (room) => {
            return room._id == roomId;
        });

        return room;
    }
    getAvatarUrl(){
        let { currentUser } = this.props;

        if(!currentUser){
            return "";
        }

        const profile = currentUser.profile;
        const placeHolditUrl =  'http://placehold.it/75?text=' + profile.firstName[0].toUpperCase() + profile.lastName[0].toUpperCase();

        const avatar = profile.pictureUrl ? profile.pictureUrl : placeHolditUrl;
        return avatar;
    }

    getBookingsWithRooms(){
       var data = [];

       for(let booking of this.props.bookings){
           let room = this.getRoomById(booking.roomId);
           data.push({
               ...booking,
               room: {
                   ...room
               }
           });
       }
       return data;
    }

    render(){
        if(!this.props.currentUser){
            return <div />;
        }
        const avatar = this.getAvatarUrl();

        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-3">
                        <h1 className="title">Profile</h1>
                        <ProfileInformations
                            firstName={this.props.currentUser.profile.firstName}
                            lastName={this.props.currentUser.profile.lastName}
                            avatar={avatar}
                        />
                    </div>
                    <div className="column is-8">
                        <h1 className="title">Booking History </h1>
                        <History enhancedBooking={this.getBookingsWithRooms()}/>
                    </div>
                </div>

            </div>

        );

    }
}

const ProfileContainer = createContainer(() => {
    let userId = Meteor.userId();
    let bookingHandle = Meteor.subscribe('bookings.byUserId', userId);
    let bookings = Bookings.find({ bookedBy: userId}, { limit: 30, sort: { bookingDate: -1}}).fetch() || [];

    let roomIds = bookings.map((booking) => {
        return booking.roomId;
    });
    roomIds = roomIds == null ? [] : roomIds;

    let roomHandle = Meteor.subscribe('rooms.byIds', roomIds);

    let rooms = Rooms.find( {_id : { $in: roomIds }}).fetch();

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
        bookings: bookings || [],
        loadingBookings : !bookingHandle.ready(),
        loadingRooms: !roomHandle.ready(),
        rooms:rooms || [],
    };
}, Profile);

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(ProfileContainer);