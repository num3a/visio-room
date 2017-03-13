import * as types from './actionTypes';

const openMobileNavBar = () => {
    return {
        type: types.NAVBAR_OPEN_MOBILE,
        openMobileNavBar: true
    };
};

const closeMobileNavBar = () => {
    return {
        type: types.NAVBAR_CLOSE_MOBILE,
        openMobileNavBar: false
    };
};

const toggleMobileNavBar = () => {
    return {
        type: types.NAVBAR_TOGGLE_MOBILE,
        openMobileNavBar: false
    };
};

export {
    openMobileNavBar,
    closeMobileNavBar,
    toggleMobileNavBar,
};