import * as types from './actionTypes';

const tabChange = tabName => ({
  type: types.DRAWER_TAB_CHANGE,
  tabName,
});

const toggleDrawer = () => ({
  type: types.DRAWER_TOGGLE,
});

const closeDrawer = () => ({
  type: types.DRAWER_CLOSE,
});

export {
  tabChange,
  toggleDrawer,
  closeDrawer,
};
