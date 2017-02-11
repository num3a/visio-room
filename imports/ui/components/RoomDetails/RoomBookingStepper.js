import React, {Component} from "react";
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import moment from "moment";
import {grey400, grey500, green500, red500, cyan700} from "material-ui/styles/colors";
import {Card, CardHeader, CardActions } from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import CircularProgress from "material-ui/CircularProgress";
import { closeBookingModal, openBookingModal, selectedBookingChanged, selectedVoucherChanged, voucherIsValid} from '../../actions/room';
import { Router, browserHistory } from  'react-router';
import { Bookings } from '../../../api/bookings/bookings';
import { surroundingDates, addDays } from "../../../common/utils/dateUtils";

import SelectedBookingDetails from './RoomBooking/SelectedBookingDetails';
import BookingPayment from './RoomBooking/BookingPayment/BookingPayment';

//TODO: plug validation voucher
//TODO: add selectable booking date
//TODO: validate booking method
//TODO: send email
//TODO: redirect to mybookings page

class RoomBookingStepper extends Component {

    constructor() {
        super();
        this.completeDialog = null;

        this.state = {
            finished: false,
            stepIndex: 0,
            cgu: false,
            voucherCode: '',
        };
    }

    handleNext() {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 1,
        });

        if(stepIndex == 1){

        }
        if(stepIndex >= 2){
            const { dispatch } = this.props;
            dispatch(openBookingModal());
            let code = this.props.voucher;
            console.log('Code: ', code);

            const bookingWithVoucher = {
                userId: Meteor.userId(),
                bookingId: this.props.bookingId,
                code: code,
            };
            Meteor.call('bookings.bookWithVoucher', bookingWithVoucher);

            Meteor.setTimeout(() => {
                dispatch(closeBookingModal());

                browserHistory.push('/history');
            }, 5000);
        }
    };

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return this.renderBookingControls();
            case 1:
                return this.renderBookingPayment();
            default:
                return this.renderBookingControls();
        }
    }

    getNextButtonActiveState(){
        const { stepIndex, cgu } = this.state;
        const { cguAccepted } = this.props;
        let disabled = false;

        switch (stepIndex){
            case 0:
                if(this.props.bookingId){
                    disabled = false;
                }
                else {
                    disabled = true;
                }
                break;
            case 1:
                disabled = !cguAccepted;

/*                if(this.props.voucherIsValid){
                   disabled = false;
               }
               else {
                   disabled = true;
               }*/
                break;
            case 2:
                disabled = !cguAccepted;
                break;
            default:
                disabled = true;
        }

        return disabled;
    }

    handleBookingSelection(booking){
        const { dispatch } = this.props;
        dispatch(selectedBookingChanged(booking._id));
        this.handleNext();
    }

    renderBookingControls(){
        let { bookings } = this.props;
        if(!bookings){
            return <h1>No data</h1>;
        }

        return(
            <div className="row">
                {
                    bookings.map((booking) => {
                        let isActive = !booking.isBooked && !booking.isBlocked;
                        let color = isActive ? green500 : red500;
                        let label = isActive ? 'Book': 'Booked';

                        return <div key={booking._id} className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                            <Card style={{margin:10, backgroundColor: grey500}}>
                                <CardHeader
                                    titleColor="white"
                                    title={booking.bookingDate.toDateString()}
                                />
                                <CardActions>
                                    <FlatButton
                                        label={label}
                                        disabled={!isActive}
                                        backgroundColor={color}
                                        style={{ color: 'white'}}
                                        onClick={() => this.handleBookingSelection(booking)}
                                    />
                                </CardActions>
                            </Card>
                        </div>;
                    })
                }
            </div>
        );
    }

    renderBookingPayment(){
        return (
            <BookingPayment/>
        );
    }

    render() {
        const {finished, stepIndex} = this.state;
        const { openBookingModal } = this.props;
        const contentStyle = {margin: '0 16px'};
        const buttonDisabled = this.getNextButtonActiveState();

        //TODO: move stepper state in redux!

        return (
                <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>

                <Stepper activeStep={stepIndex} >
                    <Step>
                        <StepLabel>Select a booking date</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Booking complete.</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {openBookingModal ? (
                            <Dialog
                                ref={(dialog) => { completeDialog = dialog}}
                                open
                                title="Booking in progress"
                                onRequestClose={() => {}}
                            >
                                <div>
                                    <CircularProgress thickness={5} />
                                    <span>You will receive a confirmation email shortly.</span></div>
                            </Dialog>

                        ) : (
                            <div>

                                <SelectedBookingDetails
                                    bookingId={this.props.bookingId}
                                    stepIndex={stepIndex}
                                />
                                <div>{this.getStepContent(stepIndex)}</div>
                                <div style={{marginTop: 12}} className={stepIndex === 0 ? 'hidden': ''}>
                                    <FlatButton
                                        label="Back"
                                        disabled={stepIndex === 0}
                                        onTouchTap={() => this.handlePrev()}
                                        style={{marginRight: 12}}
                                    />
                                    <RaisedButton
                                        disabled={buttonDisabled}
                                        label={stepIndex === 1 ? 'Complete booking' : 'Next'}
                                        color={stepIndex === 1 ? green500 : cyan700 }
                                        primary={true}
                                        onTouchTap={() => this.handleNext()}
                                    />
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

const RoomBookingStepperContainer = createContainer(({roomId}) => {
    let now  = moment().toDate();
    let maxDate = addDays(now, 10);

    let bookingHandle = Meteor.subscribe('bookings.byRoom', roomId, now, maxDate);

    return {
        isAuthenticated: Meteor.userId(),
        bookings: Bookings.find({ roomId: roomId }).fetch(),
        loadingBookings : !bookingHandle.ready()
    };
}, RoomBookingStepper);


const mapStateToProps = (state) => {
    return {
        openBookingModal: state.room.openBookingModal,
        bookingId: state.room.bookingId,
        voucher: state.room.voucher,
        voucherIsValid: state.room.voucherIsValid,
        cguAccepted: state.room.cguAccepted,
    };
};

export default connect(mapStateToProps)(RoomBookingStepperContainer);
