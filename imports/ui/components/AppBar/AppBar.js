import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { toggleDrawer} from '../../actions/drawer';

import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
//                iconElementLeft={<IconButton> <ChevronLeft color="white" /> </IconButton>}

class VisioRoomAppBar extends Component {
    _toggleDrawer(){
        const { dispatch } = this.props;
        dispatch(toggleDrawer());
    }

    render() {
        return (
            <AppBar
                onLeftIconButtonTouchTap={() => this._toggleDrawer()}
                title="Home"/>
        );
    }
}


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(VisioRoomAppBar);