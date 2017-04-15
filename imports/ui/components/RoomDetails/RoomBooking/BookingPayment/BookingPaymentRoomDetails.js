import React, { Component } from 'react';
const width = { width: '40px'};
const starColor = { color: '#ed6c63'};
const marginBottom = { marginBottom: '15px'};

const BookingPaymentRoomDetails = (props) => (

  <div className="column is-5">
    <div className="title is-2">{props.room.name}</div>
    <p className="title is-3 has-text-muted">{props.room.pricePerDay} €</p>
    <hr/>
    <br/>
    <p className="">
      <i className="fa fa-star title is-5" style={starColor}/>
      <i className="fa fa-star title is-5" style={starColor}/>
      <i className="fa fa-star title is-5" style={starColor}/>
      <i className="fa fa-star title is-5"/>
      <i className="fa fa-star title is-5"/>
      &nbsp; &nbsp;
      <strong>41 Reviews</strong>
      &nbsp; &nbsp;
      <a href="#">show all</a>
    </p>
    <br/>
    <p>
      {props.room.description}
    </p>
    <br/>
    <br/>

  </div>

);


export default BookingPaymentRoomDetails;