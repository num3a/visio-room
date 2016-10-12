import React, { Component } from 'react';
import classNames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import {  Button,  Navigation } from 'react-mdl';

class Nav extends Component {
    render() {
        if(this.props.currentUser != null) {
            return (
                    <Navigation>
                        <Link to="/" >Home</Link>
                        <Link to="/profile" >Profile</Link>
                        <Link to="/" >History</Link>
                        <Link to="/" >Payments</Link>
                        <Link to="/" >Settings</Link>
                        <Link to="/" >Help</Link>
                        <Link to="/" >CGU</Link>
                        <Link to="/" >Log out</Link>
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


export default SideNavigationContainer = createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, Nav);