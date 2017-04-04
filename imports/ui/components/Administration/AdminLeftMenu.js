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
                <li>
                    <NavLink
                        to="/partners"
                        activeClassName="is-active"
                    >Customers</NavLink>
                </li>
            </ul>
            <p className="menu-label">
                Rooms
            </p>
            <ul className="menu-list">
                <li><a>Team Settings</a></li>
                <li>
                    <a className="is-active">Manage Your Team</a>
                    <ul>
                        <NavLink
                            to="/rooms/creation"
                            activeClassName="is-active"
                        >Room creation</NavLink>
                        <li><a>Plugins</a></li>
                        <li><a>Add a member</a></li>
                    </ul>
                </li>
                <li><a>Invitations</a></li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li>
            </ul>
            <p className="menu-label">
                Transactions
            </p>
            <ul className="menu-list">
                <li><a>Payments</a></li>
                <li><a>Transfers</a></li>
                <li><a>Balance</a></li>
            </ul>
        </aside>;
    }
}

export default AdminLeftMenu;

