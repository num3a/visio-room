import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import { PaymentTokens } from '../../../api/payments/paymentTokens';
import { Roles } from 'meteor/alanning:roles';
import {closeDrawer} from "../../actions/drawer";
import { toggleMobileNavBar } from '../../actions/navbar';
import classNames from 'classnames';
import './navbar.less';

class NavBar extends Component {
    getNoAuthMenuItems(){
        const menus = [
            {
                id: 1,
                name: 'Login',
                url: '/login',
                disabled: false,
            },
            {
                id: 2,
                name: 'Sign Up',
                url: '/signup',
                disabled: false,

            },

        ];

        return menus;
    }

    getMenuItems() {
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
                name: 'Payments',
                url: '/payments',
                disabled: false,
                badge: '!',
            },
            {
                id: 4,
                name: 'Admin',
                url: '/administration',
                disabled: !isAdmin,

            },
            {
                id: 5,
                name: 'About',
                url: '/about',
                disabled: false,
            },
            {
                id: 6,
                name: 'Log Out',
                url: '/logout',
                disabled: false,

            },
        ];

        return menus;
    }

    renderBadge(badgeContent){
        const { paymentsCount } = this.props;
        if(paymentsCount === 0){
            return    <span className="tag is-danger">!</span>;
        }

        return <div></div>;
    }


    toggleMobileNavBar(){
        const { dispatch } = this.props;
        dispatch(toggleMobileNavBar());
    }

    renderMenuItems() {
        let menus = [];

        if(!this.props.isAuthenticated) {
            menus = this.getNoAuthMenuItems();
        }
        else {
            menus = this.getMenuItems();
        }

        return(
            menus.map((menu) => {
                return(<NavLink
                    exact
                    className="nav-item is-tab"
                    disabled={menu.disabled}
                    activeClassName="is-active"
                    to={menu.url}
                    key={menu.id}
                >
                    {menu.name}
                    {menu.badge ? this.renderBadge(menu.badge) : <span />}
                </NavLink>);
            })
        );
    }

    render(){
        return <nav className="nav has-shadow">
            <div className="nav-left">
                <NavLink
                    className="nav-item"
                    to="/"
                >
                    VisioRoom Beta
                </NavLink>
            </div>

            {/*
             <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
             <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
             */}
            <span className={classNames('nav-toggle', {'is-active': this.props.openMobileNavBar})}  onClick={() => this.toggleMobileNavBar() }>
    <span />
    <span />
    <span />
  </span>
            {/*
             <!-- This "nav-menu" is hidden on mobile -->
             <!-- Add the modifier "is-active" to display it on mobile -->
             */}

            <div className={classNames('nav-right', 'nav-menu',{'is-active': this.props.openMobileNavBar})}>
                {this.renderMenuItems()}
            </div>
        </nav>;
    }
}


const NavBarContainer = createContainer(() => {
    const tokenHandle = Meteor.subscribe('payments.tokenByUser', Meteor.userId());

    const loadingPayments = !tokenHandle.ready();
    const paymentsCount = PaymentTokens.find({ userId: Meteor.userId(), expired: false}).count();

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
        loadingPayments: loadingPayments,
        paymentsCount: paymentsCount
    };
}, NavBar);

const mapStateToProps = (state) => {
    return {
        openMobileNavBar : state.navbar.openMobileNavBar,
        //TODO: map payment token exists to display badge warning
    };
};

export default withRouter(connect(mapStateToProps)(NavBarContainer));
