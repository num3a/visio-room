import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';

import LoginContainer from '../Login/LogInContainer';
import SignUpContainer from '../Signup/SignUpContainer';
import { closeLoginModal } from '../../actions/login';
import { openForgotPasswordModal } from '../../actions/accounts';

class AuthenticationModal extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'login',
    };
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(closeLoginModal());
    this.setState({ activeTab: 'login' });
  }

  onRequestClose() {
    const { dispatch } = this.props;
    dispatch(closeLoginModal());
  }

  onForgotPasswordClick() {
    const { dispatch } = this.props;
    dispatch(closeLoginModal());
    dispatch(openForgotPasswordModal());
  }

  render() {
    const { openLoginModal, t } = this.props;
    const modalTitle = t('login_title');

    return (<div className={classnames('modal', openLoginModal ? 'is-active' : '')} >
      <div className="modal-background" onClick={() => this.closeModal()} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{t('login_title')}</p>
          <button className="delete" onClick={() => this.closeModal()} />
        </header>
        <section className="modal-card-body">
          <div className="tabs">
            <ul>
              <li
                className={classnames(this.state.activeTab === 'login' ? 'is-active' : '')}
                onClick={() => this.setState({ activeTab: 'login' })}
              >
                <a>{t('login_title')}</a>
              </li>
              <li
                className={classnames(this.state.activeTab === 'signup' ? 'is-active' : '')}
                onClick={() => this.setState({ activeTab: 'signup' })}
              >
                <a>{t('signup:signup_title')}</a>
              </li>
            </ul>
          </div>
          { this.state.activeTab === 'login' ?
            <LoginContainer
              isModal
            />
            :
            <SignUpContainer
              isModal
            />}
        </section>
      </div>
    </div>);
  }
}

AuthenticationModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  openLoginModal: state.login.openLoginModal,
});

export default translate(['login', 'signup'], { wait: true })(connect(mapStateToProps)(AuthenticationModal));
