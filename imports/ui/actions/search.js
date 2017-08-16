import * as types from './actionTypes';

const search = searchDate => ({
  type: types.HOME_SEARCH_DATE_CHANGE,
  searchDate,
});

export {
  search,
};
