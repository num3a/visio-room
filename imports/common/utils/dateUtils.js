import moment from 'moment';

const surroundingDates = (date) => {
  const currentDateMinusOneDay = moment(date).add(-1, 'days')
    .set({ hour: 23, minutes: 59, second: 59, millisecond: 999 }).toDate();
  const currentDatePlusOneDay = moment(date).add(1, 'days')
    .set({ hour: 0, minutes: 0, second: 0, millisecond: 0 }).toDate();

  return {
    minDate: currentDateMinusOneDay,
    maxDate: currentDatePlusOneDay,
  };
};

const addDays = (date, numberOfDays) => moment(date).add(numberOfDays, 'days').toDate();

const toDayBegin = date =>
  moment(date).set({ hour: 0, minutes: 0, second: 0, millisecond: 0 }).toDate();

const toDayEnd = date =>
  moment(date).set({ hour: 23, minutes: 59, second: 59, millisecond: 999 }).toDate();

export {
  surroundingDates,
  addDays,
  toDayEnd,
  toDayBegin,
};
