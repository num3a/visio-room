import * as types from './actionTypes';

const tabChange = (tabName) => {
    return {
        type: types.DRAWER_TAB_CHANGE,
        tabName: tabName
    };
};

const toggleDrawer = () => {
    return {
        type: types.DRAWER_TOGGLE
    };
};

const closeDrawer = () => {
    return {
        type: types.DRAWER_CLOSE
    };
};

export {
    tabChange,
    toggleDrawer,
    closeDrawer
};