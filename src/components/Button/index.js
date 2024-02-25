import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick }) => (
  <button type="submit" onClick={onClick}>
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default React.memo(Button);
