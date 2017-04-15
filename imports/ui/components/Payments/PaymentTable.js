import React, { Component } from 'react';
import classnames from 'classnames';

const PaymentTable = (props) => (
  <table className="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Card</th>
      <th>Expiration Date</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    {props.paymentTokens.map((paymentToken, index) => {
      const { brand, expMonth, expYear, last4 } = paymentToken.card;

      return  <tr key={paymentToken._id}>
        <th>{index + 1}</th>
        <td>
          <i className="fa fa-credit-card" />
          {" **** **** ****"} {last4}
        </td>
        <td>{expMonth} / {expYear}</td>
        <td>
          <button
            onClick={() => props.onPaymentTokenDelete(paymentToken)}
            className={classnames('button', 'is-danger')} >
            Delete
          </button>
        </td>
      </tr>
    })}


    </tbody>
  </table>
);

export default PaymentTable;