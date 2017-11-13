import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { I18nextProvider } from 'react-i18next';
import './useraccounts-configuration.js';
import i18n from '../../i18n/i18n';
import { RenderRoutes } from './routes.js';

// DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy app.visioroom.co --settings private/settings.json


Meteor.startup(() => {
  render(
    <I18nextProvider i18n={i18n}>
      <RenderRoutes />
    </I18nextProvider>
    , document.getElementById('app'));
});
