import moment from 'moment';

const surroundingDates = (date) => {
  let currentDateMinusOneDay = moment(date).add(-1, 'days').toDate();
  let currentDatePlusOneDay = moment(date).add(1, 'days').toDate();

  return {
    minDate: currentDateMinusOneDay,
    maxDate: currentDatePlusOneDay
  };
};

const addDays = (date, numberOfDays) => {
  return moment(date).add(numberOfDays, 'days').toDate();
};

export {
  surroundingDates,
  addDays
}