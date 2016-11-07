import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { closeDrawer, toggleDrawer} from '../../actions/drawer';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

class VisioRoomDrawer extends Component {

    constructor(){
        super();
        this.drawer = null;
    }

    _getMenuItems() {
        const menus = [
            {
                id: 1,
                name: 'Home',
                url: '/',
            },
            {
                id: 2,
                name: 'Profile',
                url: '/profile',
            },
            {
                id: 3,
                name: 'Log Out',
                url: '/logout',
            },
        ];

        return menus;
    }

    _renderMenuItems() {
        const menus = this._getMenuItems();

        return(
            menus.map((menu) => {
                return(<MenuItem
                    onTouchTap={() => this._onMenuClick(menu.url)}
                    key={menu.id}
                >
                    {menu.name}
                </MenuItem>);
            })
        );
    }

    _onMenuClick(url) {
        const { dispatch } = this.props;
        dispatch(closeDrawer());
        browserHistory.push(url);
    }
    _onRequestChange(open, reason) {
        const { dispatch } = this.props;
        if(!open){
            dispatch(closeDrawer());
        }
    }
    render() {
        return (
            <Drawer
                ref={(drawer) => this.drawer = drawer}
                docked={false}
                width={300}
                open={this.props.isOpen}
                onRequestChange={() => this._onRequestChange()}
            >
                {this._renderMenuItems()}
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.drawer.isOpen,
    };
};

export default connect(mapStateToProps)(VisioRoomDrawer);