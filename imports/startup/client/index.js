import './useraccounts-configuration.js';
//DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy app.visioroom.co --settings private/settings.json

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './routes.js';

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('app'));
});