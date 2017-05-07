import React, { Component } from 'react';
import Footer from './Footer';
import i18next from 'i18next';

class FooterContainer extends Component {

  changeLang(lng) {
    i18next.changeLanguage(lng, (err, t) => {
      // resources have been loaded
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    return (<Footer
      changeToFr={() => this.changeLang('fr')}
      changeToEn={() => this.changeLang('en')}
    />);
  }
}

export default FooterContainer;
