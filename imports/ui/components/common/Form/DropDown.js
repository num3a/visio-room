import React, { Component } from 'react';

const DropDown = (props) => (
    <div className="field">
        <label className="label">{props.label}</label>
        <p className="control">
            <select  name={props.name} required={props.required}>
                <option>{props.placeholder}</option>
                { props.data.map((item, index) => <option key={index} value={item.value}>{item.text}</option>) }
            </select>
        </p>
    </div>
);

DropDown.propTypes = {
    name: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            text: React.PropTypes.string,
            value: React.PropTypes.string,
        })
    ),
};

export default DropDown;