import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LongText = props => (
  <div className="field">
    <label className="label">{props.name}</label>
    <p className="control">
      <textarea name={props.name} className="input" type="text" placeholder={props.placeholder} required={props.required} />
    </p>
  </div>
);

LongText.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default LongText;
