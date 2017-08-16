import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Hidden = props => (
  <input type="hidden" name={props.name} value={props.value} required={props.required} />
);

Hidden.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
};
export default Hidden;
