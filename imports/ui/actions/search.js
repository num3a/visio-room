import * as types from './actionTypes';

const search = (searchDate) => {
  return {
    type: types.HOME_SEARCH_DATE_CHANGE,
    searchDate: searchDate
  };
};

export {
  search,
}