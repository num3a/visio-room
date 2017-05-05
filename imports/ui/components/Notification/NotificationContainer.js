import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = state => ({
  message: state.notification.message,
  open: state.notification.open,
  type: state.notification.notificationType,
});

export default connect(mapStateToProps)(NotificationContainer);
