import React, { Component } from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import CircularProgress from "material-ui/CircularProgress";

class RoomBookingModal extends Component {
    render(){
        return  <Dialog
            ref={(dialog) => { completeDialog = dialog}}
            open={this.props.openBookingModal}

            title="Booking in progress"
            onRequestClose={() => {}}
        >
            <div>
                <CircularProgress thickness={5} />
                <span>You will receive a confirmation email shortly.</span></div>
        </Dialog>;
    }
}


const mapStateToProps = (state) => {
    return {
        openBookingModal: state.booking.openBookingModal,
    };
};

export default connect(mapStateToProps)(RoomBookingModal)