import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class AdminLeftMenu extends Component {
    render(){
        return <aside className="menu">
            <p className="menu-label">
                General
            </p>
            <p className="menu-label">
                Partners
            </p>
            <ul className="menu-list">
                <li>
                    <NavLink to="/partners/creation"
                             activeClassName="is-active"
                    >Creation</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/home"
                        activeClassName="is-active"
                    >Dashboard</NavLink>
                </li>
            </ul>
            <p className="menu-label">
                Rooms
            </p>
            <ul className="menu-list">
                <li>
                    <NavLink
                        to="/rooms/creation"
                        activeClassName="is-active"
                    >Creation</NavLink>
                </li>
                <li><a>Invitations</a></li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li>
            </ul>
        </aside>;
    }
}

export default AdminLeftMenu;

