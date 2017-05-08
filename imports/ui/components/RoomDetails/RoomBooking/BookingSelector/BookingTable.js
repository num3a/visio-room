import React, { Component } from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';

const BookingTable = props => (
  <table className="table">
    <thead>
    <tr>
      <th>#</th>
      <th>{props.t('selection_table_header_date')}</th>
      <th>{props.t('selection_table_header_price')}</th>
      <th>{props.t('selection_table_header_availability')}</th>
      {/*<th>{props.t('selection_table_header_action')}</th>*/}
    </tr>
    </thead>
    <tbody>
    {props.bookings.map((booking, index) => {
      const isActive = !booking.isBooked && !booking.isBlocked;
      const available = props.t('selection_table_button_available');
      const booked = props.t('selection_table_button_booked');
      const unavailable = props.t('selection_table_button_unavailable');

      let label = isActive ? available : booked;

      if (booking.isBlocked) {
        label = unavailable;
      }

      return (<tr key={booking._id}>
        <th>{index + 1}</th>
        <td>{booking.bookingDate.toDateString()}</td>
        <td>{booking.price}</td>
        <td>
          { booking.isBlocked ?
            <span className="tag is-light">&nbsp;</span> :
            <span
              className={classnames('tag', isActive ? 'is-success' : 'is-danger')}
            >&nbsp;</span>
          }
        </td>
        {/* <td className="has-text-centered">
          { booking.isBlocked ?
            <a
              disabled
              className="button is-light"
            >{label}</a> :
            <a
              disabled={!isActive}
              onClick={() => props.onSelect(booking)}
              className={classnames('button', isActive ? 'is-success' : 'is-danger')}
            >{label}</a>
          }
        </td>
        */}
      </tr>);
    })}

    </tbody>
    <tfoot>

    <tr>
      <th colSpan={3}>
        {props.t('selection_table_header_total')}
      </th>
      <td>
        {props.totalPrice} €
      </td>
    </tr>
    </tfoot>
  </table>
);

export default translate(['booking'], { wait: true })(BookingTable);

