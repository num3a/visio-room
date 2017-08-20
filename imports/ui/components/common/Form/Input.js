import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  <div className="field">
    <label htmlFor={props.name} className="label">{props.placeholder}</label>
    <p className="control">
      <input
        id={props.name}
        name={props.name} className="input"
        type={props.type || 'text'}
        placeholder={props.placeholder}
        required={props.required}
        defaultValue={props.defaultValue}

      />
    </p>
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string,
};
export default Input;
