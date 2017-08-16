import * as types from './actionTypes';

const openMobileNavBar = () => ({
  type: types.NAVBAR_OPEN_MOBILE,
  openMobileNavBar: true,
});

const closeMobileNavBar = () => ({
  type: types.NAVBAR_CLOSE_MOBILE,
  openMobileNavBar: false,
});

const toggleMobileNavBar = () => ({
  type: types.NAVBAR_TOGGLE_MOBILE,
  openMobileNavBar: false,
});

export {
  openMobileNavBar,
  closeMobileNavBar,
  toggleMobileNavBar,
};
