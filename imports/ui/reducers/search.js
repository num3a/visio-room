import * as types from '../actions/actionTypes';

const initialSate = {
  searchDate: new Date(),
};

const searchReducer = (state = initialSate, action = {}) => {
  switch (action.type){
    case types.HOME_SEARCH_DATE_CHANGE:
      return {
        ...state,
        searchDate: action.searchDate,
      };
    default:
      return state;
  }
};

export default searchReducer;