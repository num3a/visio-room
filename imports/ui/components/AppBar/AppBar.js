import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { toggleDrawer} from '../../actions/drawer';
import { createContainer } from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Router, browserHistory} from 'react-router-dom'
import { openLoginModal } from '../../actions/login';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';

const Logged = (props) => (
  <IconMenu

    {...props}
    iconButtonElement={
        <IconButton><MoreVertIcon color="white" /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
      <MenuItem primaryText="Switch language" />
  </IconMenu>
);

class VisioRoomAppBar extends Component {

  _toggleDrawer(){
    const { dispatch } = this.props;
    dispatch(toggleDrawer());
  }
  _onLoginClick(){
    const { dispatch } = this.props;
    dispatch(openLoginModal());
  }
  _renderRightButton(){
    if (!this.props.isAuthenticated) {
      return(
        <FlatButton onClick={() => this._onLoginClick()}>Login</FlatButton>
      );
    }
    else {
      return(<Logged />);
    }
  }
  render() {
    return (
      <AppBar
        onLeftIconButtonTouchTap={() => this._toggleDrawer()}
        iconElementRight={this._renderRightButton()}
        title="VisioRoom"/>
    );
  }
}

const VisioRoomAppBarContainer = createContainer(() => {
  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user()
  };
}, VisioRoomAppBar);


const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(VisioRoomAppBarContainer);