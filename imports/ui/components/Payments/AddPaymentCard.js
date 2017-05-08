import React, { Component } from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';

const AddPaymentCard = (props) => (
  <div>
    <form onSubmit={props.onSubmit}>
      <div className="field">
        <p className="control">
          <label className="label">
            {props.t('form_code')}
          </label>
          <input
            className="input"
            type="text"
            placeholder="Card number"
            defaultValue="4000000000000077"
            data-stripe="number"
          />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <label className="label">
            {props.t('form_month')}
          </label>
          <input className="input" type="text" placeholder="Month"
                 size={2}
                 defaultValue="10"
                 data-stripe="exp_month"/>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <label className="label">
            {props.t('form_year')}
          </label>
          <input className="input" type="text" placeholder="Year"
                 defaultValue={2018}
                 size="2" data-stripe="exp_year"/>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <label className="label">
            {props.t('form_cvc')}
          </label>
          <input className="input"
                 defaultValue={133}
                 type="text"
                 size="4" data-stripe="cvc"
                 placeholder="CVC" />
        </p>
      </div>
      <div className="field is-grouped">
        <p className="control">
          <button
            type="submit"
            className={classnames('button', 'is-primary', props.loading ? 'is-loading': '')}
          >{props.t('form_submit')}</button>
        </p>
      </div>
    </form>
  </div>
);

export default translate(['payment'], { wait: true })(AddPaymentCard);

