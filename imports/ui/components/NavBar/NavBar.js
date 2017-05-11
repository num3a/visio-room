import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import { PropTypes } from 'prop-types';
import './navbar.less';

const renderBadge = (paymentCounts) => {
  if (paymentCounts === 0) {
    return <span className="tag is-danger">!</span>;
  }
  return <span />;
};

const disconnectedMenus = () => ([
  {
    id: 1,
    name: 'log_in',
    url: '/login',
    disabled: false,
  },
  {
    id: 2,
    name: 'sign_up',
    url: '/signup',
    disabled: false,

  },

]);

const connectedMenus = (isAdmin) => ([
  {
    id: 1,
    name: 'home',
    url: '/',
    disabled: false,
  },
  {
    id: 2,
    name: 'profile',
    url: '/profile',
    disabled: false,

  },
  {
    id: 3,
    name: 'payments',
    url: '/payments',
    disabled: false,
    badge: '!',
  },
  {
    id: 4,
    name: 'admin',
    url: '/admin',
    disabled: !isAdmin,

  },
  {
    id: 5,
    name: 'about',
    url: '/about',
    disabled: false,
  },
  {
    id: 6,
    name: 'log_out',
    url: '/logout',
    disabled: false,

  },
]);

const NavBar = (props) => {
  const { t, isAdmin, isAuthenticated } = props;
  const menus = isAuthenticated ? connectedMenus(isAdmin) : disconnectedMenus();

  return (<nav className="nav has-shadow">
    <div className="nav-left">
      <NavLink
        onClick={props.closeMobileNavBar}
        className="nav-item"
        to="/"
      >
        {t('app_title')} <span style={{ fontSize:12, marginLeft: 5, color: 'grey' }}>with</span>
      </NavLink>
      <a className="nav-item is-brand" target="_blank" href="https://www.lacompagnie.com">
        <img src="/assets/lacompagnie/logos/logo_blanc/LOGO_LC_WHITE_112_17.png" width={112} height={17} />
      </a>
    </div>
    <span className={classNames('nav-toggle', { 'is-active': props.openMobileNavBar })} onClick={props.toggleMobileNavBar}>
      <span />
      <span />
      <span />
    </span>
    <div className={classNames('nav-right', 'nav-menu', { 'is-active': props.openMobileNavBar })}>
      {
        menus.map((menu) => {
          if (menu.disabled) {
            return null;
          }
          return (<NavLink
            exact
            className="nav-item is-tab"
            activeClassName="is-active"
            to={menu.url}
            key={menu.id}
            onClick={props.closeMobileNavBar}
          >
            {t(menu.name)}
            {renderBadge(menu.badge)}
          </NavLink>);
        })
      }
    </div>
  </nav>);
};

NavBar.propsType = {
  openMobileNavBar: PropTypes.bool.isRequired,
  toggleMobileNavBar: PropTypes.func.isRequired,
  closeMobileNavBar: PropTypes.func.closeMobileNavBar,
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
export default translate(['nav'], { wait: true })(NavBar);
