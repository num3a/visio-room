import React, { Component } from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';

const PaymentTable = props => (
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>{props.t('card')}</th>
        <th>{props.t('expiration_date')}</th>
        <th>{props.t('action')}</th>
      </tr>
    </thead>
    <tbody>
      {props.paymentTokens.map((paymentToken, index) => {
        const { brand, expMonth, expYear, last4 } = paymentToken.card;

        return (<tr key={paymentToken._id}>
          <th>{index + 1}</th>
          <td>
            <i className="fa fa-credit-card" />
            {' **** **** ****'} {last4}
          </td>
          <td>{expMonth} / {expYear}</td>
          <td>
            <button
              onClick={() => props.onPaymentTokenDelete(paymentToken)}
              className={classnames('button', 'is-danger')}
            >
              {props.t('action_delete')}
            </button>
          </td>
        </tr>);
      })}


    </tbody>
  </table>
);

export default translate(['payment'], { wait: true })(PaymentTable);

