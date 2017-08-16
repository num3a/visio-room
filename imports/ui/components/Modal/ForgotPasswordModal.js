import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { closeAddCardModal } from '../../actions/payments';
import FlatButton from 'material-ui/FlatButton';
import { closeForgotPasswordModal } from '../../actions/accounts';
import ForgotPasswordContainer from '../Password/ForgotPasswordContainer';

class ForgotPasswordModal extends Component {

  _handleCloseDialog() {
    const { dispatch } = this.props;
    dispatch(closeForgotPasswordModal());
  }

  render() {
    const { openForgotPasswordModal, dispatch } = this.props;
    const customContentStyle = {
      height: '100%',
      maxHeight: 'none',
    };

    return (
      <Dialog
        title="Enter a email"
        modal={false}
        open={openForgotPasswordModal}
        contentStyle={customContentStyle}
        onRequestClose={() => { this._handleCloseDialog(); }}
      >
        <ForgotPasswordContainer />
      </Dialog>
    );
  }
}


const mapStateToProps = state => ({
  openForgotPasswordModal: state.accounts.openForgotPasswordModal,
});

export default connect(mapStateToProps)(ForgotPasswordModal);
