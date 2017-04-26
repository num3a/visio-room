import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class AdminLeftMenu extends Component {
  render() {
    return (<aside className="menu">
      <p className="menu-label">
            General
        </p>
      <p className="menu-label">
            Partners
        </p>
      <ul className="menu-list">
        <li>
          <NavLink
            to="/admin/partners/"
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
            to="/admin/rooms"
            activeClassName="is-active"
          >Creation</NavLink>
        </li>
          <li><NavLink to="/admin/manage-bookings" activeClassName="is-active">Manage</NavLink></li>
        <li><a>Cloud Storage Environment Settings</a></li>
        <li><a>Authentication</a></li>
      </ul>
    </aside>);
  }
}

export default AdminLeftMenu;

