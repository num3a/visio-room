import React, { Component } from 'react';

const Input = (props) => (
    <div className="field">
        <label htmlFor={props.name} className="label">{props.placeholder}</label>
        <p className="control">
            <input
                id={props.name}
                name={props.name} className="input"
                type={props.type || "text"}
                placeholder={props.placeholder}
                required={props.required}
                defaultValue={props.defaultValue}

            />
        </p>
    </div>
);

Input.propTypes = {
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    required: React.PropTypes.bool,
    defaultValue: React.PropTypes.any,
};
export default Input;