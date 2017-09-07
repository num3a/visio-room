import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { translate } from 'react-i18next';
import ProfileInformations from './ProfileInformations';
import History from './History';
import { BookingsTransactions } from  '../../../api/bookings-transactions/bookings-transactions-collection';

class Profile extends Component {

  getAvatarUrl() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return '';
    }

    const profile = currentUser.profile;
    const placeHolditUrl = `http://placehold.it/75?text=${profile.firstName[0].toUpperCase()}${profile.lastName[0].toUpperCase()}`;

    const avatar = profile.pictureUrl ? profile.pictureUrl : placeHolditUrl;
    return avatar;
  }

  render() {
    if (!this.props.currentUser) {
      return <div />;
    }
    const avatar = this.getAvatarUrl();
    const { t, currentUser } = this.props;
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <h1 className="title">{t('title')}</h1>
            <ProfileInformations
              firstName={currentUser.profile.firstName}
              lastName={currentUser.profile.lastName}
              avatar={avatar}
            />
          </div>
          <div className="column is-8">
            <h1 className="title">{t('history')}</h1>
            <History transactions={this.props.transactions} />
          </div>
        </div>

      </div>

    );
  }
}

const ProfileContainer = createContainer(() => {
  const transactionsHandle = Meteor.subscribe('bookings-transactions.byUserId');
  const transactions = BookingsTransactions.find({}).fetch();

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    loadingTransactions: !transactionsHandle.ready(),
    transactions: transactions || [],
  };
}, Profile);

const mapStateToProps = state => ({
});

export default translate(['profile'], { wait: true })(connect(mapStateToProps)(ProfileContainer));
