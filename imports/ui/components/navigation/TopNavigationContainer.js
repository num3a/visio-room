import React, { Component } from 'react';
import classNames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import {  Button,  Navigation } from 'react-mdl';

class Nav extends Component {
    render() {
        if(this.props.currentUser != null) {
            return ( <div></div>);
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