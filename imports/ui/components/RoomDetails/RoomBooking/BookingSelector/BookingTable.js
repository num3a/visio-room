import React, { Component } from 'react';
import classnames from 'classnames';

const BookingTable = (props) => (
  <table className="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    {props.bookings.map((booking, index) => {

      let isActive = !booking.isBooked && !booking.isBlocked;
      let label = isActive ? 'Book': 'Booked';

      if(booking.isBlocked){
        label = 'Unavailable';
      }

      return  <tr key={booking._id}>
        <th>{index + 1}</th>
        <td>{booking.bookingDate.toDateString()}</td>
        <td>{booking.price}</td>
        <td>
          { booking.isBlocked ?
            <a
              disabled={true}
              className="button is-light"
            >{label}</a> :
            <a
              disabled={!isActive}
              onClick={() => props.onSelect(booking)}
              className={classnames('button', isActive ? 'is-success' : 'is-danger')} >{label}</a>
          }
        </td>
      </tr>
    })}


    </tbody>
  </table>
);

export default BookingTable;