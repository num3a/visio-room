import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import { closeForgotPasswordModal } from '../../actions/accounts';
import ForgotPasswordContainer from '../Password/ForgotPasswordContainer';

class ForgotPasswordModal extends Component {

  closeModal() {
    const { dispatch } = this.props;
    dispatch(closeForgotPasswordModal());
  }

  render() {
    const { openForgotPasswordModal, t } = this.props;

    return (
      <div className={classnames('modal', openForgotPasswordModal ? 'is-active' : '')} >
        <div className="modal-background" onClick={() => this.closeModal()} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{t('header')}</p>
            <button className="delete" onClick={() => this.closeModal()} />
          </header>
          <section className="modal-card-body">
            <ForgotPasswordContainer />
          </section>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  openForgotPasswordModal: state.accounts.openForgotPasswordModal,
});

export default translate(['password'], { wait: true })(connect(mapStateToProps)(ForgotPasswordModal));
