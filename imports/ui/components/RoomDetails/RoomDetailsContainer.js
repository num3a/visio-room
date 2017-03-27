import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {Rooms} from "../../../api/rooms/rooms";
import CircularProgress from "material-ui/CircularProgress";
import {staticMarkerImage} from "../../../common/utils/googleMaps";
import Details from './RoomDetails';
import RoomBooking from './RoomBooking';
import RoomDetailsInfo from './RoomInfo/RoomDetailsInfo';
import RoomAdditionalInfos from './RoomAdditionalInfos';
import { toggleAvailability, resetAvailability, selectedBookingChanged, selectedCardChanged} from '../../actions/booking';
import {connect} from "react-redux";

class RoomDetails extends Component {

    renderBooking() {
        return(
            <div>
                <RoomBooking
                    roomId={this.props.roomId}
                />
            </div>
        );
    }
    componentWillUnmount(){
        const { dispatch } = this.props;
        dispatch(resetAvailability());
        dispatch(selectedBookingChanged(null));
        dispatch(selectedCardChanged(null));
    }
    getBigPicture(){
        if(!this.props.room || !this.props.room.location){
            return '';
        }

        return staticMarkerImage(this.props.room.location[0], this.props.room.location[1], 1000, 1000);
    }

    toggleAvailability(){
        const { dispatch } = this.props;
        dispatch(toggleAvailability());
    }

    render() {
        //TODO: display striked price when voucher is active

        let staticImageUrl = this.getBigPicture();
        return (
            <div>
                { !this.props.availability && !this.props.bookingId?
                    <Details
                        roomId={this.props.roomId}
                        room={this.props.room}
                        bigPicture={staticImageUrl}
                        bookingId={this.props.booking}
                        toggle={() => this.toggleAvailability()}
                    >
                    </Details>
                    :
                    <RoomBooking
                        roomId={this.props.roomId}
                    />
                }
                <RoomAdditionalInfos
                    roomId={this.props.roomId}
                    room={this.props.room}
                />
            </div>
        );
    }
}

const RoomDetailsContainer = createContainer(({ match }) => {
    let roomHandle = Meteor.subscribe('rooms.byId', match.params.roomId);
    let room = Rooms.findOne(match.params.roomId);

    return {
        roomId: match.params.roomId,
        room: room || {},
        loadingRooms: !roomHandle.ready(),
    }
}, RoomDetails);
const mapStateToProps = (state) => {
    return {
        availability: state.booking.toggleAvailability,
        bookingId: state.booking.bookingId,

    };
};

export default connect(mapStateToProps)(RoomDetailsContainer);
