import React, { Component } from 'react';
//defaultValue={props.defaultValue === item.value ? item.value : ''}

const DropDown = (props) => (
    <div className="field">
        <label className="label">{props.label}</label>
        <p className="control">
            <select  name={props.name} required={props.required} value={props.defaultValue}>
                <option value="">{props.placeholder}</option>
                { props.data ?
                    props.data.map((item, index) =>
                        <option key={index} value={item.value} >
                            {item.text}
                        </option>
                    )
                    : null
                }
            </select>
        </p>
    </div>
);

DropDown.propTypes = {
    name: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    defaultValue: React.PropTypes.any,
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            text: React.PropTypes.string,
            value: React.PropTypes.string,
        })
    ),
};

export default DropDown;