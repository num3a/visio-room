import React, { Component } from 'react';
import PropTypes from 'prop-types';

// defaultValue={props.defaultValue === item.value ? item.value : ''}

const DropDown = props => (
  <div className="field">
    <label className="label">{props.label}</label>
    <p className="control">
      <select name={props.name} required={props.required} value={props.defaultValue}>
        <option value="">{props.placeholder}</option>
        { props.data ?
          props.data.map((item, index) =>
            <option key={index} value={item.value} >
              {item.text}
            </option>,
          )
          : null
        }
      </select>
    </p>
  </div>
);

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

export default DropDown;
