import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RadioSet = (props) => (
    <div className="field">
        <label className="label">{props.label}</label>
        <p className="control">
            <input name={props.name} className="input" type="radio" required={props.required} />
        </p>
    </div>
);

RadioSet.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
};
export default RadioSet;