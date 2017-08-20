import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';
import ForgotPassword from './ForgotPassword';
import { closeForgotPasswordModal } from '../../actions/accounts';
import { notificationOpenError } from '../../actions/notification';

class ForgotPasswordContainer extends Component {
  onSubmitEmail(event) {
    event.preventDefault();

    const email = event.target.email.value;

    const options = {
      email,
    };

    Accounts.forgotPassword(options, (error) => {
      const { dispatch } = this.props;

      // TODO: wrap Accounts UI with bulma https://www.meteor.com/tutorials/react/adding-user-accounts
      if (error) {
        console.log('An error occurs', err);
        dispatch(notificationOpenError(err.message));
      } else {
        dispatch(closeForgotPasswordModal());
      }
    });
  }

  render() {
    return (
      <ForgotPassword
        onSubmitEmail={event => this.onSubmitEmail(event)}
      />
    );
  }
}

ForgotPasswordContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});


export default connect(mapStateToProps)(ForgotPasswordContainer);
