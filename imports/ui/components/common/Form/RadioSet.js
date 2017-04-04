import React, { Component } from 'react';

const RadioSet = (props) => (
    <div className="field">
        <label className="label">{props.label}</label>
        <p className="control">
            <input name={props.name} className="input" type="radio" required={props.required} />
        </p>
    </div>
);

RadioSet.propTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
};
export default RadioSet;