import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import AdminLeftMenu from './AdminLeftMenu';

class Administration extends Component {

  render() {
    return (<div className="container">

      <div className="columns">
        <div className="column is-3">
          <div className="box">
            <AdminLeftMenu />
          </div>
        </div>
        <div className="column is-9">
          {this.props.children}
        </div>
      </div>
    </div>);
  }
}

Administration.propsType = {
  children: PropTypes.object.required,
};

const AdministrationContainer = withTracker(() => {
  const admin = Roles.userIsInRole(Meteor.userId(), 'super-admin');
  const superAdmin = Roles.userIsInRole(Meteor.userId(), 'super-admin');

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    isAdmin: admin,
    isSuperAdmin: superAdmin,
  };
}, Administration);

const mapStateToProps = state => ({
  selectedRoomId: state.admin.roomId,
});

export default connect(mapStateToProps)(AdministrationContainer);
