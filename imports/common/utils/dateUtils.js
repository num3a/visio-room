import moment from 'moment';

const surroundingDates = (date) => {
  const currentDateMinusOneDay = moment(date).add(-1, 'days').toDate();
  const currentDatePlusOneDay = moment(date).add(1, 'days').toDate();

  return {
    minDate: currentDateMinusOneDay,
    maxDate: currentDatePlusOneDay,
  };
};

const addDays = (date, numberOfDays) => moment(date).add(numberOfDays, 'days').toDate();

export {
  surroundingDates,
  addDays,
};
