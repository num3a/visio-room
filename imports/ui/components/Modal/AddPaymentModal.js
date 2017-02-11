import React, { Component } from 'react';
import AddCard from '../Payments/AddCard';
import Dialog from 'material-ui/Dialog';
import {connect} from "react-redux";
import { closeAddCardModal} from '../../actions/payments';
import FlatButton from 'material-ui/FlatButton';

class AddPaymentModal extends Component {

    _handleCloseDialog(){
        const { dispatch } = this.props;
        dispatch(closeAddCardModal());
    }

    render(){
        const { openAddPaymentModal, dispatch } = this.props;
        const customContentStyle = {
            height: '100%',
            maxHeight: 'none',
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => {this._handleCloseDialog()}}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {this._handleCloseDialog()}}
            />,
        ];

        return (
            <Dialog
                title="Add a payment method"
                modal={false}
                open={openAddPaymentModal}
                contentStyle={customContentStyle}
                onRequestClose={() => {this._handleCloseDialog()}}
            >
                <AddCard/>
            </Dialog>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        openAddPaymentModal: state.payments.openAddPaymentModal,
    };
};

export default connect(mapStateToProps)(AddPaymentModal);