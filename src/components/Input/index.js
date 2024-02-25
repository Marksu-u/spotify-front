import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Input = ({ label, type = 'text', name, id, ...rest }) => (
  <div className="input-group">
    {label && (
      <label htmlFor={id || name} className="input-label">
        {label}
      </label>
    )}
    <input
      type={type}
      name={name}
      id={id || name}
      className="input-field"
      {...rest}
    />
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default React.memo(Input);
