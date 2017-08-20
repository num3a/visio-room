import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';

const marginBottom = { marginBottom: '10px' };

const Notification = props => (
  <div>
    {props.open ?
      <div className="columns">
        <div className="column is-12">
          <div className={classnames('notification', props.type)} style={marginBottom} >
            <button className="delete" onClick={props.close} />
            {props.message}
          </div>
        </div>
      </div>
      :
      <div />}
  </div>
);


Notification.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Notification;
