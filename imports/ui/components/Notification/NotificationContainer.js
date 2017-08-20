import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Notification from './Notification';
import { notificationMessageChanged, notificationClose } from '../../actions/notification';

class NotificationContainer extends Component {
  close() {
    const { dispatch } = this.props;
    dispatch(notificationMessageChanged(''));
    dispatch(notificationClose());
  }
  render() {
    return (<Notification
      open={this.props.open}
      message={this.props.message}
      type={this.props.type}
      close={() => this.close()}
    />);
  }
}

NotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  message: state.notification.message,
  open: state.notification.open,
  type: state.notification.notificationType,
});

export default connect(mapStateToProps)(NotificationContainer);
