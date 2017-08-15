import { surroundingDates,
  addDays,
  toDayEnd,
  toDayBegin,} from './dateUtils';
import moment from 'moment';
import { assert } from 'meteor/practicalmeteor:mocha';

describe('my module', function () {
  it('does something that should be tested', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
    assert.equal(-1, 1);
  })
})