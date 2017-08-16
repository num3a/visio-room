import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { closeBookingModal } from '../../actions/room';

class ErrorMessageSnackBar extends Component {

  handleRequestClose() {
    const { dispatch } = this.props;
    dispatch(closeBookingModal());
  }

  render() {
    return (<div>
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={4000}
        onRequestClose={() => this.handleRequestClose()}
        style={{ color: 'red', width: 500 }}
      />
    </div>);
  }
}


const mapStateToProps = state => ({
  message: state.snackbar.errorMessage,
  open: state.snackbar.openSnackBar,
});

export default connect(mapStateToProps)(ErrorMessageSnackBar);
