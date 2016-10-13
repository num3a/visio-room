import React, { Component } from 'react';
import classNames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { FABButton,  Button,  Navigation, IconButton, Menu, MenuItem, Spinner} from 'react-mdl';

class Nav extends Component {
    renderMenuIcon() {
        if(this.props.currentUser.profile.pictureUrl){
            return (
                <FABButton size={50} id="demo-menu-lower-right">
                    <img src={this.props.currentUser.profile.pictureUrl} width={60} height={60} />
                </FABButton>
                );
        }
        return (
            <IconButton name="more_vert" id="demo-menu-lower-right" />
        )

    }
    render() {
        if(this.props.isLogginIn){
            return (<div>
                <Spinner/>
            </div>);
        }
        if(this.props.currentUser != null) {
            return (
                    <Navigation className={"mdl-layout--large-screen-only"}>
                        <Link to="/" >Home</Link>
                        <Link to="/profile" >Profile</Link>
                        <Link to="/" >History</Link>
                        <Link to="/" >Payments</Link>
                        <div style={{position: 'relative'}}>
                            {this.renderMenuIcon()}
                            <Menu target="demo-menu-lower-right" align="right">
                                <MenuItem>Settings</MenuItem>
                                <MenuItem>Help</MenuItem>
                                <MenuItem>CGU</MenuItem>
                                <MenuItem>
                                    <Link to="/logout">Log out</Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Navigation>
            );
        }
        return(
            <Navigation className={"mdl-layout--large-screen-only"}>
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
        isLogginIn: Meteor.loggingIn(),
    };
}, Nav);