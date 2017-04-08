import React, { Component } from 'react';

const Hidden = (props) => (
    <input type="hidden" name={props.name} value={props.value} required={props.required}/>
);

Hidden.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    required: React.PropTypes.bool,
};
export default Hidden;