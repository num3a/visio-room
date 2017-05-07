import React, { Component } from 'react';
import i18next from 'i18next';

class ChangeLanguage extends Component {
  componentWillMount() {
    i18next.changeLanguage('en', (err, t) => {
        // resources have been loaded
    });
  }

  render() {
    return null;
  }
}

export default ChangeLanguage;
