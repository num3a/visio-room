/* eslint-disable no-undef */
App.info({
  id: 'com.visio.room.app',
  name: 'VisioRoom',
  description: '',
  author: 'Emmanuel ERNEST',
  email: 'contact@example.com',
  website: 'http://example.com',
});
// Set up resources such as icons and launch screens.

    /*
App.icons({
    'iphone': 'icons/icon-60.png',
    'iphone_2x': 'icons/icon-60@2x.png',
    // ... more screen sizes and platforms ...
});
App.launchScreens({
    'iphone': 'splash/Default~iphone.png',
    'iphone_2x': 'splash/Default@2x~iphone.png',
    // ... more screen sizes and platforms ...
});
*/

App.accessRule('https://*.stripe.com/*');

    // Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
// Pass preferences for a particular PhoneGap/Cordova plugin
    /*
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
    APP_ID: '1234567890',
    API_KEY: 'supersecretapikey'
});
*/
// Add custom tags for a particular PhoneGap/Cordova plugin
// to the end of generated config.xml.
// Universal Links is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);
