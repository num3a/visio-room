import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RadioSet = props => (
  <div className="field">
    <p className="control">
      <input name={props.name} type="radio" required={props.required} value={props.value} onChange={props.onChange} checked={props.checked} />
      <label className="label" htmlfor={props.name}>{props.label}</label>
    </p>
  </div>
);

RadioSet.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  checked: PropTypes.bool
};
export default RadioSet;
