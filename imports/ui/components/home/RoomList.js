import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createContainer} from "meteor/react-meteor-data";
import { Rooms } from '../../../api/rooms/rooms';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class RoomList extends Component {
    _renderCards() {
        return(
            this.props.rooms.map((room, index) => {
                return (
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <Card key={index} className="home-card">
                            <CardHeader
                                title={room.name}
                                subtitle="Subtitle"
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText title={room.description} />
                        </Card>
                    </div>
                );
            })
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this._renderCards()}
                </div>
            </div>);

    }
}


const RoomListContainer = createContainer(() => {
    //  Meteor.subscribe('rooms.all');

    const roomsHandle = Meteor.subscribe('rooms.all');


    const loading = !roomsHandle.ready();
    //const rooms = Rooms.find({});
    return {
        currentUser: Meteor.user(),
        rooms: Rooms.find({}).fetch(),
        loading: loading,
    };
}, RoomList);


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(RoomListContainer);