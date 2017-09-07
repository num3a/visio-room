import React, { PureComponent } from 'react';
import moment from 'moment';
// TODO: use PureComponent
const floatRight = { float: 'right' };

const History = props => (
  <div className="box">
      {props.transactions.map(transaction => (
          <article key={transaction._id} className="media">
              <div className="media-left" />
              <div className="media-content">
                  <div className="content">
                      <p>
                          <strong>{transaction.room.name}</strong>
                          <br />
                          <span> {transaction.room.address} </span>
                          <span style={floatRight}>Price: {transaction.amount}€</span>
                      </p>
                  </div>
                  <div className="content">
                      <h4>Booking dates:</h4>
                      {transaction.bookings.map(booking => (
                          <div>
                              <strong style={floatRight}>{moment(booking.bookingDate).format('DD/MM/YYYY')}</strong>
                          </div>
                      ))}
                  </div>
                  <nav className="level is-hidden-mobile">
                      <div className="level-left">
                          <a className="level-item">
                              <span className="icon is-small"><i className="fa fa-reply" /></span>
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
      ))}  </div>
);

export default History;
