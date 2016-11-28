import React, {Component} from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {connect} from "react-redux";
import {closeDrawer} from "../../actions/drawer";
import {browserHistory} from "react-router";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import {createContainer} from "meteor/react-meteor-data";
import Avatar from "material-ui/Avatar";

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
                name: 'Booking History',
                url: '/history',
            },
            {
                id: 4,
                name: 'About',
                url: '/about',
            },
            {
                id: 5,
                name: 'Log Out',
                url: '/logout',
            },
        ];

        return menus;
    }
    _renderLoggedMenuItems(){

    }
    _renderMenuItems() {
        if(!this.props.isAuthenticated) {
            return <div></div>;
        }

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

    _renderProfileInformations(){
        if(!this.props.isAuthenticated) {
            return <div></div>;
        }
        let { currentUser } = this.props;

        if(this.props.currentUser){
            return (  <List>
                <ListItem
                    disabled={true}
                    leftAvatar={
                        <Avatar src={currentUser.profile.pictureUrl} />
                    }
                >
                    {currentUser.profile.firstName} {currentUser.profile.lastName.toUpperCase()}
                </ListItem>
            </List>);
        }
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
    render(){
        return (
            <Drawer
                ref={(drawer) => this.drawer = drawer}
                docked={false}
                width={300}
                open={this.props.isOpen}
                onRequestChange={() => this._onRequestChange()}
            >
                {this._renderProfileInformations()}
                {this._renderMenuItems()}
            </Drawer>
        );
    }
}

const VisioRoomDrawerContainer = createContainer(() => {
    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
    };
}, VisioRoomDrawer);

const mapStateToProps = (state) => {
    return {
        isOpen: state.drawer.isOpen,
    };
};

export default connect(mapStateToProps)(VisioRoomDrawerContainer);