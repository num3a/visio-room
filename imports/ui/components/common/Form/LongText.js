import React, { Component } from 'react';

const LongText = (props) => (
    <div className="field">
        <label className="label">{props.label}</label>
        <p className="control">
            <textarea name={props.name} className="input" type="text" placeholder={props.placeholder} required={props.required} />
        </p>
    </div>
);

LongText.propTypes = {
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
};
export default LongText;