import React, { Component } from 'react';

const DropDown = (props) => (
    <div className="field">
        <label className="label">{props.label}</label>
        <p className="control">
            <input name={props.name} className="input" type="text" placeholder={props.placeholder} required={props.required} />
        </p>
    </div>
);

DropDown.propTypes = {
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
};
export default DropDown;