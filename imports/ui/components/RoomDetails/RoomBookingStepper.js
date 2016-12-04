import React, {Component} from "react";
import moment from "moment";
import {blueGrey500, green500, red500, cyan700} from "material-ui/styles/colors";
import {Card, CardHeader, CardActions } from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {Voucher} from "../../../api/voucher/vouchers";
import { Bookings } from '../../../api/bookings/bookings';
import Dialog from 'material-ui/Dialog';
import CircularProgress from "material-ui/CircularProgress";
import {connect} from "react-redux";
import { closeBookingModal, openBookingModal, selectedBookingChanged} from '../../actions/room';
import {createContainer} from "meteor/react-meteor-data";
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { Router, browserHistory } from  'react-router';
import { surroundingDates, addDays } from "../../../common/utils/dateUtils";

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
            finished: stepIndex >= 2,
        });
        if(stepIndex >= 2){
            const { dispatch } = this.props;
            dispatch(openBookingModal());

            Meteor.call('email.send');

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
                return this.renderVoucherControls();
            case 2:
                return this.renderCompleteControls();
            default:
                return this.renderBookingControls();
        }
    }

    getNextButtonActiveState(){
        const { stepIndex, cgu } = this.state;
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
                disabled = true;
                if(this.props.voucher){
                    disabled = false;
                }
                break;
            case 2:
                disabled = !cgu;
                break;
            default:
                disabled = true;
        }

        return disabled;
    }

    handleBookingSelection(booking){
        const { dispatch } = this.props;
        dispatch(selectedBookingChanged(booking._id));
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
                        let label = isActive ? 'Book': 'Not available';

                        return <div key={booking._id} className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                            <Card style={{margin:10, backgroundColor: blueGrey500}}>
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

    renderVoucherControls() {
        return (<div className="row center-xs">
            <TextField
                value="IVR8QN1N"
                hintText="Enter your voucher"
            />
        </div>);
    }

    onCGUChange(isInputChecked){
        this.setState({cgu: isInputChecked});
    }

    renderCompleteControls() {
        return (
            <div className="row">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non p
                    roident, sunt in culpa qui officia deserunt mollit anim id est l
                    aborum.
                    <span>By using the service, I accepts the <a target="_blank" href="/cgu">CGU</a></span>
                </p>

                <Checkbox
                    label="I accept"
                    onCheck={(event, isInputChecked) => {
                        this.onCGUChange(isInputChecked)}
                    }
                />
            </div>
        )
    }

    render() {
        const {finished, stepIndex} = this.state;
        const { openBookingModal } = this.props;
        const contentStyle = {margin: '0 16px'};
        const buttonDisabled = this.getNextButtonActiveState();

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex} >
                    <Step>
                        <StepLabel>Select a booking date</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Enter a voucher</StepLabel>
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
                            <div>{this.getStepContent(stepIndex)}</div>
                            <div style={{marginTop: 12}}>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onTouchTap={() => this.handlePrev()}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    disabled={buttonDisabled}
                                    label={stepIndex === 2 ? 'Complete booking' : 'Next'}
                                    color={stepIndex === 2 ? green500 : cyan700 }
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

    const voucherHandle = Meteor.subscribe('voucher.byCode', 'IVR8QN1N'); // this.props.voucherCode);
    Meteor.subscribe('voucher.byCode','IVRBY4KW');
    let bookingHandle = Meteor.subscribe('bookings.byRoom', roomId, now, maxDate);

    return {
        isAuthenticated: Meteor.userId(),
        loadingVoucher: !voucherHandle.ready(),
        voucher: Voucher.findOne({ code: { $in: ['IVR8QN1N','IVRBY4KW']}}),
        bookings: Bookings.find({ roomId: roomId }).fetch(),
        loadingBookings : !bookingHandle.ready()
    };
}, RoomBookingStepper);


const mapStateToProps = (state) => {
    return {
        openBookingModal: state.room.openBookingModal,
        bookingId: state.room.bookingId,
    };
};

export default connect(mapStateToProps)(RoomBookingStepperContainer);