import React, { Component } from 'react';
import moment from 'moment';

const floatRight = { float: 'right'};

const History = (props) => (
    <div className="box">
        {props.enhancedBooking.map((booking) => (
            <article key={booking._id} className="media">
                <div className="media-left">
                </div>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{booking.room.name}</strong> <small style={floatRight}>{moment(booking.bookingDate).format('DD/MM/YYYY')}</small>
                            <br />
                            <span> {booking.room.address} </span> <span style={floatRight}>Price: {booking.price}€</span>
                        </p>
                    </div>
                    <nav className="level">
                        <div className="level-left">
                            <a className="level-item">
                                <span className="icon is-small"><i className="fa fa-reply"/></span>
                            </a>
                            <a className="level-item">
                                <span className="icon is-small"><i className="fa fa-retweet" /></span>
                            </a>
                            <a className="level-item">
                                <span className="icon is-small"><i className="fa fa-heart" /></span>
                            </a>
                        </div>
                    </nav>
                </div>
            </article>
        ))}
    </div>

);

export default History;
