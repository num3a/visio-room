import React, { Component } from 'react';
import AddPaymentCardContainer from '../Payments/AddPaymentCardContainer';
import {connect} from "react-redux";
import { closeAddCardModal, loadingAddCard } from '../../actions/payments';
import classnames from 'classnames';


class AddPaymentModal extends Component {

    closeModal(){
        const { dispatch } = this.props;
        dispatch(closeAddCardModal());
    }

    render(){
        const { openAddPaymentModal, dispatch } = this.props;
        const customContentStyle = {
            height: '100%',
            maxHeight: 'none',
        };


        return (
            <div className={classnames('modal', openAddPaymentModal ? 'is-active' : '')} >
                <div className="modal-background"  onClick={() => this.closeModal()}/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add payment card</p>
                        <button className="delete" onClick={() => this.closeModal()} />
                    </header>
                    <section className="modal-card-body">
                        <AddPaymentCardContainer  />
                    </section>
                    {/*
                    <footer className="modal-card-foot">
                        <a className="button is-success">Save changes</a>
                        <a className="button" onClick={() => this.closeModal()}>Cancel</a>
                    </footer>  */}
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        openAddPaymentModal: state.payments.openAddPaymentModal,
    };
};

export default connect(mapStateToProps)(AddPaymentModal);