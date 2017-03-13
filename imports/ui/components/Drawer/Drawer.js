import React, {Component} from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {connect} from "react-redux";
import {closeDrawer} from '../../actions/drawer';
import { openLoginModal, closeLoginModal } from '../../actions/login';
import {browserHistory} from 'react-router-dom';
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import {createContainer} from "meteor/react-meteor-data";
import Avatar from "material-ui/Avatar";
import { grey700, white } from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import { PaymentTokens } from '../../../api/payments/paymentTokens';
import { Roles } from 'meteor/alanning:roles';
import createHistory from 'history/createBrowserHistory'


class VisioRoomDrawer extends Component {

    constructor(){/**/
        super();
        this.drawer = null;
    }

    _getMenuItems() {
        let isAdmin = Roles.userIsInRole(Meteor.userId(),'admin');

        const menus = [
            {
                id: 1,
                name: 'Home',
                url: '/',
                disabled: false,
            },
            {
                id: 2,
                name: 'Profile',
                url: '/profile',
                disabled: false,

            },
            {
                id: 3,
                name: 'Booking History',
                url: '/history',
                disabled: false,
            },
            {
                id: 4,
                name: 'Payments',
                url: '/payments',
                disabled: false,
                badge: '!',
            },
            {
                id: 5,
                name: 'Admin',
                url: '/admin',
                disabled: !isAdmin,

            },
            {
                id: 6,
                name: 'About',
                url: '/about',
                disabled: false,
            },
            {
                id: 7,
                name: 'Log Out',
                url: '/logout',
                disabled: false,

            },
        ];

        return menus;
    }

    _handleLogin(){
        const { dispatch } = this.props;
        dispatch(closeDrawer());
        dispatch(openLoginModal());
    }

    _renderLoggedMenuItems(){
        if(this.props.isAuthenticated) {
            return <div></div>;
        }
        return(
            <MenuItem
                onTouchTap={() => this._handleLogin()}
                style={{color: white}}
            >
                Log In
            </MenuItem>
        );
    }

    _renderAvatar(){
        let { currentUser } = this.props;
        if(!currentUser.profile || !currentUser.profile.pictureUrl){
            return (<Avatar>{currentUser.profile.firstName[0].toUpperCase()}{currentUser.profile.lastName[0].toUpperCase()}</Avatar>);
        }
        return (<Avatar src={currentUser.profile.pictureUrl} />);
    }

    _renderBadge(badgeContent){
        const { paymentsCount } = this.props;
        if(paymentsCount === 0){
            return    <Badge
                badgeContent={badgeContent}
                secondary={true}
            />;
        }

        return <div></div>;
    }

    _renderMenuItems() {
        if(!this.props.isAuthenticated) {
            return <div></div>;
        }

        const menus = this._getMenuItems();

        return(
            menus.map((menu) => {
                return(<MenuItem
                    disabled={menu.disabled}
                    onTouchTap={() => this._onMenuClick(menu.url)}
                    key={menu.id}
                    style={{color: white}}
                >
                    {menu.name}
                    {menu.badge ? this._renderBadge(menu.badge) : <div></div>}
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
                    leftAvatar={this._renderAvatar()}
                    style={{color: white}}
                >
                    {currentUser.profile.firstName} {currentUser.profile.lastName.toUpperCase()}
                </ListItem>
            </List>);
        }
    }

    _onMenuClick(url) {
        const { dispatch } = this.props;
        dispatch(closeDrawer());

        this.props.history.push(url);
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
                containerStyle={{backgroundColor: grey700}}
            >
                {this._renderLoggedMenuItems()}
                {this._renderProfileInformations()}
                {this._renderMenuItems()}
            </Drawer>
        );
    }
}

const VisioRoomDrawerContainer = createContainer(() => {
    const tokenHandle = Meteor.subscribe('payments.tokenByUser', Meteor.userId());

    const loadingPayments = !tokenHandle.ready();
    const paymentsCount = PaymentTokens.find({ userId: Meteor.userId(), expired: false}).count();

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
        loadingPayments: loadingPayments,
        paymentsCount: paymentsCount
    };
}, VisioRoomDrawer);

const mapStateToProps = (state) => {
    return {
        isOpen: state.drawer.isOpen,
        //TODO: map payment token exists to display badge warning
    };
};

export default connect(mapStateToProps)(VisioRoomDrawerContainer);
