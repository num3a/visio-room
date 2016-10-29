import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { closeDrawer} from '../../actions/drawer';

class VisioRoomDrawer extends Component {
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
        //TODO: open url
    }

    render() {
        return (
            <Drawer
                docked={true}
                width={300}
                open={this.props.isOpen}
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