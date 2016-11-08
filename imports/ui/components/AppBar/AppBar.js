import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { toggleDrawer} from '../../actions/drawer';
import { createContainer } from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';
import { Router, browserHistory} from 'react-router'
import { openLoginModal } from '../../actions/appbar';

import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
//                iconElementLeft={<IconButton> <ChevronLeft color="white" /> </IconButton>}

/*
*     <div>
 <FlatButton style={{color: 'white', fontSize: 24, fontWeight: 400,}}>SignUp</FlatButton>
 <FlatButton>Login</FlatButton>
 </div>
 */

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
            return(<div></div>);
        }
    }
    render() {
        return (
            <AppBar
                onLeftIconButtonTouchTap={() => this._toggleDrawer()}
                iconElementRight={this._renderRightButton()}
                title="Home"/>
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