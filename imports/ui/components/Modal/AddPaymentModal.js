import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import AddPaymentCardContainer from '../Payments/AddPaymentCardContainer';
import { closeAddCardModal, loadingAddCard } from '../../actions/payments';

class AddPaymentModal extends Component {

  closeModal() {
    const { dispatch } = this.props;
    dispatch(closeAddCardModal());
  }

  render() {
    const { openAddPaymentModal, dispatch, t } = this.props;
    const customContentStyle = {
      height: '100%',
      maxHeight: 'none',
    };


    return (
      <div className={classnames('modal', openAddPaymentModal ? 'is-active' : '')} >
        <div className="modal-background" onClick={() => this.closeModal()} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{t('add_payment_card')}</p>
            <button className="delete" onClick={() => this.closeModal()} />
          </header>
          <section className="modal-card-body">
            <AddPaymentCardContainer />
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


const mapStateToProps = state => ({
  openAddPaymentModal: state.payments.openAddPaymentModal,
});

export default translate(['payment'], { wait: true })(connect(mapStateToProps)(AddPaymentModal));
