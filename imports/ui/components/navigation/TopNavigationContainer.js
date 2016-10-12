import React, { Component } from 'react';
import classNames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import {  Button,  Navigation, IconButton, Menu, MenuItem } from 'react-mdl';

class Nav extends Component {
    render() {
        if(this.props.currentUser != null) {
            return (
                    <Navigation className={"mdl-layout--large-screen-only"}>
                        <Link to="/" >Home</Link>
                        <Link to="/profile" >Profile</Link>
                        <Link to="/" >History</Link>
                        <Link to="/" >Payments</Link>
                        <div style={{position: 'relative'}}>
                            <IconButton name="more_vert" id="demo-menu-lower-right" />
                            <Menu target="demo-menu-lower-right" align="right">
                                <MenuItem>Settings</MenuItem>
                                <MenuItem>Help</MenuItem>
                                <MenuItem>CGU</MenuItem>
                                <MenuItem>Log out</MenuItem>
                            </Menu>
                        </div>
                    </Navigation>
            );
        }
        return(
            <Navigation>
                <Link to="/login">Log In</Link>
                <Link to="/signup" >
                    <Button raised ripple accent>Sign Up</Button>
                </Link>
            </Navigation>
        );

    }
}


export default TopNavigationContainer = createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, Nav);